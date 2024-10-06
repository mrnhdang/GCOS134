package com.example.demo.service;

import com.example.demo.dto.BillGetDetailDto;
import com.example.demo.dto.BillPaymentDto;
import com.example.demo.dto.OrderProductDto;
import com.example.demo.entity.*;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.BillRepository;
import com.example.demo.repository.OrderDetailRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class BillService {
    private UserService userService;
    private OrderService orderService;
    private OrderDetailService orderDetailService;
    private OrderDetailRepository orderDetailRepository;
    private UserRepository userRepository;
    private BillRepository billRepository;
    private OrderRepository orderRepository;
    private MongoTemplate mongoTemplate;

    public List<BillGetDetailDto> findAllBillSortByPurchaseDate() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.lookup("purchase_order", "order", "_id", "order"),
                Aggregation.unwind("order"),
                Aggregation.sort(Sort.by(
                        Sort.Order.desc("order.purchaseDate"))),
                Aggregation.project()
                        .and("id").as("id")
                        .and("order._id").as("orderId")
                        .and("status").as("status")
                        .and("payDate").as("payDate")
                        .and("order.user.username").as("username")
                        .and("totalPrice").as("totalPrice")
                );
        AggregationResults<BillGetDetailDto> results = mongoTemplate.aggregate(aggregation, "bill", BillGetDetailDto.class);
        return results.getMappedResults();
    }

    public List<BillGetDetailDto> getAllBill() {
        return findAllBillSortByPurchaseDate();
    }

    public Bill checkExistBill(String id) {
        return billRepository.findById(id).orElseThrow(() -> new NotFoundException("Bill with id " + id + " doesn't exist."));
    }

    public BillGetDetailDto getBillDetail(String id) {
        Bill bill = checkExistBill(id);

        List<OrderProductDto> orderProductDtos = new ArrayList<>();

        bill.getOrder().getProducts().forEach(product -> {
            OrderDetail orderDetail = orderDetailRepository.findByProductAndOrder(product.getId(), bill.getOrder().getId());
            OrderProductDto dto = OrderProductDto.builder()
                    .productId(product.getId())
                    .productName(product.getProductName())
                    .price(product.getPrice())
                    .orderAmount(orderDetail.getTotalAmount())
                    .holdAmount(orderDetail.getHoldAmount())
                    .categoryName(product.getCategory().getCategoryName())
                    .build();
            orderProductDtos.add(dto);
        });

        return BillGetDetailDto.builder()
                .orderId(bill.getOrder().getId())
                .products(orderProductDtos)
                .id(bill.getId())
                .payDate(bill.getPayDate())
                .status(bill.getStatus())
                .username(bill.getOrder().getUser().getUsername())
                .totalPrice(bill.getTotalPrice())
                .build();
    }

    public void deleteBillById(String id) {
        checkExistBill(id);
        billRepository.deleteById(id);
    }

    public void deleteAllBill() {
        billRepository.deleteAll();
    }

    public void payBill(String id, BillPaymentDto dto) {
        // validation
        Bill bill = checkExistBill(id);
        User user = userService.getUserById(dto.userId());
        if (user.getBalance().compareTo(dto.payPrice()) < 0) {
            throw new InvalidInputParameter("You don't have enough balance.");
        }
        if (dto.payPrice().compareTo(bill.getTotalPrice()) < 0) {
            throw new InvalidInputParameter("Not enough for the bill.");
        }

        // update bill status, pay date, and user balance
        bill.setPayDate(LocalDate.now());
        bill.setStatus(BillStatus.PAID);

        // update order
        BigDecimal updateBalance = user.getBalance().subtract(dto.payPrice());
        user.setBalance(updateBalance);
        userRepository.save(user);

        Order order = orderService.checkExistOrder(bill.getOrder().getId());
        order.setStatus(OrderStatus.DONE);
        orderRepository.save(order);

        // update order details and update inventory
        orderDetailService.addOrUpdateOrderDetail(new ArrayList<>(), bill.getOrder());

        // save
        billRepository.save(bill);
    }

}
