package com.example.demo.service;

import com.example.demo.dto.ProductPostDto;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product addProduct(ProductPostDto dto) {
        Product newProduct = Product.builder().name(dto.name()).price(dto.price()).build();
        return productRepository.save(newProduct);
    }

    public Product updateProduct(ProductPostDto dto, String id) {
        Product savedProduct = Product.builder().id(id).name(dto.name()).price(dto.price()).build();
        return productRepository.save(savedProduct);
    }
    public void deleteProductById(String id) {
        productRepository.deleteById(id);
    }
}
