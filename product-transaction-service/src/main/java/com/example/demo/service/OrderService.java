package com.example.demo.service;

import com.example.demo.dto.OrderGetDetailDto;
import com.example.demo.dto.OrderPostDto;
import com.example.demo.dto.OrderProductDto;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderDetail;
import com.example.demo.entity.OrderStatus;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private OrderDetailRepository orderDetailRepository;
    private OrderDetailService orderDetailService;

    public Order checkExistOrder(String orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order with id " + orderId + " doesn't exist."));
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
                    .build();
            orderProductDtos.add(dto);
        });
        return orderProductDtos;
    }

    public List<OrderGetDetailDto> getAllOrder() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map((order) -> OrderGetDetailDto.builder()
                .purchaseDate(order.getPurchaseDate())
                .billId(order.getBill() != null ? order.getBill().getId() : null)
                .id(order.getId())
                .user(order.getUser())
                .status(order.getStatus())
                .build()).toList();
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
