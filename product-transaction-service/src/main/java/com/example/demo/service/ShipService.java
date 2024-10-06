package com.example.demo.service;

import com.example.demo.dto.OrderGetDetailDto;
import com.example.demo.dto.ShipDetailDto;
import com.example.demo.dto.ShipPostDto;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderStatus;
import com.example.demo.entity.Ship;
import com.example.demo.entity.User;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ShipRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@AllArgsConstructor
public class ShipService {
    private ShipRepository shipRepository;
    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private OrderService orderService;

    public Ship checkExistShip(String shipId) {
        return shipRepository.findById(shipId).orElseThrow(() ->
                new NotFoundException("Order's Shipping with id " + shipId + " doesn't exist."));
    }

    public List<ShipDetailDto> getAllShip() {
        List<Ship> ships = shipRepository.findAll();
        return ships.stream().map(ship ->
                ShipDetailDto.builder()
                        .id(ship.getId())
                        .receivedDate(ship.getReceivedDate())
                        .user(ship.getUser())
                        .status(ship.getStatus())
                        .build()
        ).toList();
    }

    public ShipDetailDto getShipDetail(String id) {
        Ship ship = checkExistShip(id);
        return ShipDetailDto.builder()
                .id(ship.getId())
                .receivedDate(ship.getReceivedDate())
                .user(ship.getUser())
                .status(ship.getStatus())
                .orders(ship.getOrders().stream().map(order ->
                        OrderGetDetailDto.builder()
                                .id(order.getId())
                                .status(order.getStatus())
                                .products(orderService.mapToProductDto(order.getProducts(), order.getId()))
                                .purchaseDate(order.getPurchaseDate())
                                .build()).toList())
                .build();
    }

    public List<Ship> searchShippingOrder(LocalDate from, LocalDate to) {
        return shipRepository.searchShippingOrder(from, to);
    }

    public Ship createShip(ShipPostDto dto) {
        List<Order> orders = new ArrayList<>();
        if (dto.orders().isEmpty()) throw new InvalidInputParameter("Field 'orders' must not empty.");
        dto.orders().forEach(orderId -> {
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order with id " + orderId + " doesn't exist."));
            if (Objects.equals(order.getStatus(), OrderStatus.CANCELLED)) {
                throw new InvalidInputParameter("Order with id " + orderId + " has been cancelled.");
            }
            if (order.getShip() != null && order.getShip().getId() != null) {
                throw new InvalidInputParameter("Order with id " + orderId + " is already in the shipping queue.");
            }
            orders.add(order);
        });
        User user = userRepository.findById(dto.userId()).orElseThrow(() -> new NotFoundException("User with id " + dto.userId() + " doesn't exist."));
        Ship newShip = Ship.builder().status(OrderStatus.PROCESSING).user(user).orders(orders).build();
        orders.forEach(order -> {
            order.setShip(newShip);
            orderRepository.save(order);
        });
        return shipRepository.save(newShip);
    }

    public Ship confirmShippedOrder(String shipId) {
        Ship ship = checkExistShip(shipId);
        ship.setStatus(OrderStatus.DONE);
        ship.setReceivedDate(LocalDate.now());
        orderRepository.saveAll(ship.getOrders());
        return shipRepository.save(ship);
    }

    public void deleteOrderShipping(String shipId) {
        checkExistShip(shipId);
        List<Order> orders = orderRepository.findByShip(shipId);
        orders.forEach(order -> {
            order.setShip(null);
            orderRepository.save(order);
        });
        shipRepository.deleteById(shipId);
    }
}
