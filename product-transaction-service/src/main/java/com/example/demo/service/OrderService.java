package com.example.demo.service;

import com.example.demo.dto.OrderGetDetailDto;
import com.example.demo.dto.OrderPostDto;
import com.example.demo.dto.OrderProductDto;
import com.example.demo.entity.*;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.OrderDetailRepository;
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
    private OrderDetailRepository orderDetailRepository;

    public Order checkExistOrder(String orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order with id " + orderId + " doesn't exist."));
    }

    public List<Order> getAllOrder() {
        return orderRepository.findAll();
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
                    .image(product.getImage())
                    .build();
            orderProductDtos.add(dto);
        });

        return OrderGetDetailDto.builder()
                .id(orderId)
                .purchaseDate(orderDetails.getPurchaseDate())
                .user(orderDetails.getUser())
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

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new NotFoundException("User with id " + dto.userId() + " doesn't exist."));

        dto.products().forEach(orderProductDto -> {
            if (orderProductDto.getOrderAmount() <= 0) {
                throw new InvalidInputParameter("Order amount must be more than 0.");
            }
            Product orderProduct = productRepository.findById(orderProductDto.getProductId())
                    .orElseThrow(() -> new NotFoundException("Product with id " + orderProductDto.getProductId() + " doesn't exist."));
            products.add(orderProduct);
            OrderDetail orderDetail = OrderDetail.builder().product(orderProduct).totalAmount(orderProductDto.getOrderAmount()).build();
            orderDetails.add(orderDetail);
        });

        newOrder = Order.builder()
                .user(user)
                .purchaseDate(LocalDate.now())
                .products(products)
                .status(OrderStatus.PROCESSING)
                .build();
        Order savedOrder = orderRepository.save(newOrder);
        orderDetails.forEach(orderDetail -> orderDetail.setOrder(savedOrder));
        orderDetailRepository.saveAll(orderDetails);

        return savedOrder;
    }

    public void deleteOrder(String orderId) {
        checkExistOrder(orderId);
        orderDetailRepository.deleteByOrderId(orderId);
        orderRepository.deleteById(orderId);
    }
}
