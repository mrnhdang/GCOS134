package com.example.demo.service;

import com.example.demo.dto.OrderGetDetailDto;
import com.example.demo.dto.ShipDetailDto;
import com.example.demo.dto.UserLoginDto;
import com.example.demo.dto.UserRegisterDto;
import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private MongoTemplate mongoTemplate;

    public User registerUser(UserRegisterDto dto) {
        User user = User.builder().username(dto.getUsername())
                .address(dto.getAddress())
                .phoneNumber(dto.getPhoneNumber())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .role("USER")
                .balance(dto.getBalance())
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
        User saveUser = getUserById(id);
        Optional.ofNullable(dto.getAddress()).ifPresent(saveUser::setAddress);
        Optional.ofNullable(dto.getBalance()).ifPresent(saveUser::setBalance);
        Optional.ofNullable(dto.getRole()).ifPresent(saveUser::setRole);
        Optional.ofNullable(dto.getEmail()).ifPresent(saveUser::setEmail);
        Optional.ofNullable(dto.getPassword()).ifPresent(saveUser::setPassword);
        Optional.ofNullable(dto.getPhoneNumber()).ifPresent(saveUser::setPhoneNumber);
        Optional.ofNullable(dto.getUsername()).ifPresent(saveUser::setUsername);

        return userRepository.save(saveUser);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public List<OrderGetDetailDto> getUserOrders(String userId) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.lookup("bill", "bill", "_id", "bill"),
                Aggregation.unwind("bill"),
                Aggregation.lookup("user", "user", "_id", "user"),
                Aggregation.unwind("user"),
                Aggregation.match(new Criteria("user._id").is(new ObjectId(userId))),
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

}
