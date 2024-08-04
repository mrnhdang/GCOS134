package com.example.demo.service;

import com.example.demo.dto.OrderPostDto;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderStatus;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

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

    public List<Order> getAllOrder() {
        return orderRepository.findAll();
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

    public List<Order> placeOrders(OrderPostDto dto) {
        List<Order> mappedOrder = new ArrayList<>();
        List<Product> products = new ArrayList<>();
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new NotFoundException("User with id " + dto.userId() + " doesn't exist."));

        dto.products().forEach(orderProductDto -> {
            Product orderProduct = productRepository.findById(orderProductDto.productId())
                    .orElseThrow(() -> new NotFoundException("Product with id " + orderProductDto.productId() + " doesn't exist."));
            products.add(orderProduct);
            Order newOrder = Order.builder()
                    .user(user)
                    .purchaseDate(LocalDate.now())
                    .totalAmount(orderProductDto.orderAmount())
                    .status(OrderStatus.PROCESSING)
                    .build();
            mappedOrder.add(newOrder);
        });

        mappedOrder.forEach(order -> {
            order.setProducts(products);
        });

        return orderRepository.saveAll(mappedOrder);
    }
}
