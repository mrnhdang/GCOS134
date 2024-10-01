package com.example.demo.repository;

import com.example.demo.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    @Query("{ 'user.id': ?0 }")
    List<Order> findByUser(String userId);

    @Query("{ 'purchaseDate': { $gte: ?0, $lte: ?1 } }")
    List<Order> searchOrder(LocalDate from, LocalDate to);

    List<Order> findByShip(String ship);
}
