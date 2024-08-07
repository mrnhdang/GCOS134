package com.example.demo.repository;

import com.example.demo.entity.Ship;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShipRepository extends MongoRepository<Ship, String> {
    @Query("{ 'receivedDate' : { $gte: ?0, $lte: ?1 } }")
    List<Ship> searchShippingOrder(LocalDate from ,LocalDate to);
}
