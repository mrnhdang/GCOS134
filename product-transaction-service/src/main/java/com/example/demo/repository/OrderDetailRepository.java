package com.example.demo.repository;

import com.example.demo.entity.OrderDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends MongoRepository<OrderDetail, String> {

    @Query("{ 'product.id': ?0, 'order.id': ?1 }")
    OrderDetail findByProductAndOrder(String product, String order);

    @Query("{ 'order.id': ?0 }")
    List<OrderDetail> findByOrder(String order);

    @Query(value = "{ 'order.id': ?0 }", delete = true)
    void deleteByOrderId(String orderId);
}
