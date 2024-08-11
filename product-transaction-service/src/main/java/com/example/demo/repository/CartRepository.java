package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {

    @Query("{ 'user.id': ?0}")
    List<Cart> findByUser(String userId);

}
