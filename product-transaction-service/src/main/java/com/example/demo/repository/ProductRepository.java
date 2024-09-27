package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    @Query("{ 'productName': { $regex: ?0, '$options': 'i' } }")
    List<Product> searchProducts(String search);

    @Query("{ 'category.id': ?0 }")
    List<Product> searchProductsByCategory(String categoryId);
}
