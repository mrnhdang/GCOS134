package com.example.demo.service;

import com.example.demo.dto.OrderGetDetailDto;
import com.example.demo.dto.OrderPostDto;
import com.example.demo.dto.OrderProductDto;
import com.example.demo.entity.*;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.*;
import com.mongodb.client.result.UpdateResult;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.Query;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
@Transactional
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private OrderDetailRepository orderDetailRepository;
    private InventoryRepository inventoryRepository;
    private OrderDetailService orderDetailService;
    private MongoTemplate mongoTemplate;

    public Order checkExistOrder(String orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order with id " + orderId + " doesn't exist."));
    }

    public List<OrderGetDetailDto> findAllOrderOrderByPurchaseDate() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.lookup("bill", "bill", "_id", "bill"),
                Aggregation.unwind("bill"),
                Aggregation.lookup("user", "user", "_id", "user"),
                Aggregation.unwind("user"),
                Aggregation.sort(Sort.by(Sort.Order.desc("purchaseDate"))),
                Aggregation.project()
                        .and("id").as("id")
                        .and("bill._id").as("billId")
                        .and("user").as("user")
                        .and("status").as("status")
                        .and("purchaseDate").as("purchaseDate")

        );
        AggregationResults<OrderGetDetailDto> results = mongoTemplate.aggregate(aggregation, "purchase_order", OrderGetDetailDto.class);
        return results.getMappedResults();
    }

    public List<OrderProductDto> mapToProductDto(List<Product> products, String orderId) {
        List<OrderProductDto> orderProductDtos = new ArrayList<>();

        products.forEach(product -> {
            OrderDetail orderDetail = orderDetailRepository.findByProductAndOrder(product.getId(), orderId);
            OrderProductDto dto = OrderProductDto.builder()
                    .productId(product.getId())
                    .productName(product.getProductName())
                    .price(product.getPrice())
                    .orderAmount(orderDetail.getTotalAmount())
                    .holdAmount(orderDetail.getHoldAmount())
                    .image(product.getImage())
                    .categoryName(product.getCategory().getCategoryName())
                    .build();
            orderProductDtos.add(dto);
        });
        return orderProductDtos;
    }

    public List<OrderGetDetailDto> getAllOrder() {
        return findAllOrderOrderByPurchaseDate();
    }

    public OrderGetDetailDto getOrderDetails(String orderId) {
        Order orderDetails = checkExistOrder(orderId);

        List<OrderProductDto> orderProductDtos = new ArrayList<>();

        orderDetails.getProducts().forEach(product -> {
            OrderDetail orderDetail = orderDetailRepository.findByProductAndOrder(product.getId(), orderId);
            OrderProductDto dto = OrderProductDto.builder()
                    .productId(product.getId())
                    .productName(product.getProductName())
                    .price(product.getPrice())
                    .orderAmount(orderDetail.getTotalAmount())
                    .holdAmount(orderDetail.getHoldAmount())
                    .image(product.getImage())
                    .build();
            orderProductDtos.add(dto);
        });

        return OrderGetDetailDto.builder()
                .id(orderId)
                .purchaseDate(orderDetails.getPurchaseDate())
                .user(orderDetails.getUser())
                .status(orderDetails.getStatus())
                .products(orderProductDtos)
                .billId(orderDetails.getBill() != null ? orderDetails.getBill().getId() : null)
                .build();
    }

    public List<Order> searchOrder(LocalDate from, LocalDate to) {
        return orderRepository.searchOrder(from, to);
    }

    public Order cancelOrder(String orderId) {
        Order cancelledOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order with id " + orderId + " doesn't found."));
        cancelledOrder.setStatus(OrderStatus.CANCELLED);
        String userId = cancelledOrder.getUser().getId();
        String billId = cancelledOrder.getBill().getId();

        // update bill status
        mongoTemplate
                .update(Bill.class).matching(where("bill.id").is(new ObjectId(billId)))
                .apply(new Update().set("bill.status", BillStatus.CANCELLED))
                .first();

        // update user balance
        BigDecimal billPrice = cancelledOrder.getBill().getTotalPrice();
        BigDecimal updateBalance = cancelledOrder.getUser().getBalance().add(billPrice);
        mongoTemplate.update(User.class)
                .matching(where("user.id").is(userId))
                .apply(new Update().set("user.balance", updateBalance))
                .all();

        return orderRepository.save(cancelledOrder);
    }

    public Order placeOrders(OrderPostDto dto) {
        Order newOrder;
        List<OrderDetail> orderDetails = new ArrayList<>();
        List<Product> products = new ArrayList<>();

        // validate user
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new NotFoundException("User with id " + dto.userId() + " doesn't exist."));

        // build order details
        dto.products().forEach(orderProductDto -> {
            if (orderProductDto.getOrderAmount() <= 0) {
                throw new InvalidInputParameter("Order amount must be more than 0.");
            }
            Product orderProduct = productRepository.findById(orderProductDto.getProductId())
                    .orElseThrow(() -> new NotFoundException("Product with id " + orderProductDto.getProductId() + " doesn't exist."));
            Inventory inventory = inventoryRepository.findByProduct(orderProductDto.getProductId());
            if (inventory == null) {
                throw new NotFoundException("Inventory " + orderProductDto.getProductId() + " doesn't exist.");
            } else if (inventory.getCurrentQuantity() <= 0) {
                throw new InvalidInputParameter(orderProductDto.getProductName() + " is out of stock.");
            } else if (orderProductDto.getOrderAmount() > inventory.getCurrentQuantity()) {
                throw new InvalidInputParameter(orderProductDto.getProductName() + " is not enough in stock.");
            }
            OrderDetail orderDetail = OrderDetail.builder()
                    .product(orderProduct)
                    .holdAmount(orderProductDto.getOrderAmount())
                    .totalAmount(0)
                    .build();
            products.add(orderProduct);
            orderDetails.add(orderDetail);
        });

        // build the order
        newOrder = Order.builder()
                .user(user)
                .purchaseDate(LocalDate.now())
                .products(products)
                .status(OrderStatus.PROCESSING)
                .build();
        Order savedOrder = orderRepository.save(newOrder);

        // create order detail
        orderDetailService.addOrUpdateOrderDetail(orderDetails, savedOrder);

        return savedOrder;
    }

    public void deleteOrder(String orderId) {
        checkExistOrder(orderId);
        orderDetailRepository.deleteByOrderId(orderId);
        orderRepository.deleteById(orderId);
    }

    public void deleteAllOrder() {
        orderDetailRepository.deleteAll();
        orderRepository.deleteAll();
    }
}
