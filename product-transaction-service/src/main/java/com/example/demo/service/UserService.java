package com.example.demo.service;

import com.example.demo.dto.OrderGetDetailDto;
import com.example.demo.dto.UserLoginDto;
import com.example.demo.dto.UserRegisterDto;
import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private OrderRepository orderRepository;
    private OrderService orderService;

    public User registerUser(UserRegisterDto dto) {
        User user = User.builder().username(dto.getUsername())
                .address(dto.getAddress())
                .phoneNumber(dto.getPhonenumber())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .role(dto.getRole())
                .build();
        return userRepository.save(user);
    }

    public User loginUser(UserLoginDto dto) {
        return userRepository.findByUsernameAndPassword(dto.getUsername(), dto.getPassword())
                .orElseThrow(() -> new InvalidInputParameter("Invalid username or password"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User updateUser(UserRegisterDto dto, String id) {
        User saveUser = User.builder().id(id).username(dto.getUsername())
                .address(dto.getAddress())
                .phoneNumber(dto.getPhonenumber())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .role(dto.getRole())
                .balance(dto.getBalance())
                .build();
        return userRepository.save(saveUser);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public List<OrderGetDetailDto> getUserOrders(String userId) {
        List<Order> orders = orderRepository.findByUser(userId);
        List<OrderGetDetailDto> orderGetDetailDtos = new ArrayList<>();
        if (!orders.isEmpty()) {
            orders.forEach(order -> {
                orderGetDetailDtos.add(orderService.getOrderDetails(order.getId()));
            });
        }
        return orderGetDetailDtos;
    }

}
