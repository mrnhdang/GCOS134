package com.example.demo.repository;

import com.example.demo.entity.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends MongoRepository<Inventory, String> {

    @Query("{ 'product.id': ?0 }")
    Inventory findByProduct(String id);
}
