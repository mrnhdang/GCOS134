package com.example.demo.service;

import com.example.demo.dto.ProductPostDto;
import com.example.demo.entity.Category;
import com.example.demo.entity.Inventory;
import com.example.demo.entity.Product;
import com.example.demo.exception.InvalidInputParameter;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.InventoryRepository;
import com.example.demo.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Optionals;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;
    private InventoryRepository inventoryRepository;
    private CategoryService categoryService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> searchProduct(String search) {
        if (!Objects.isNull(search)) {
            return productRepository.searchProducts(search);
        } else return Collections.emptyList();
    }

    public List<Product> getProductsByCategory(String categoryId) {
        if (!Objects.isNull(categoryId)) {
            return productRepository.searchProductsByCategory(categoryId);
        } else return Collections.emptyList();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with id " + id + " doesn't exist."));
    }

    public Product addProduct(ProductPostDto dto) {
        Category category = categoryService.checkExistCategory(dto.categoryId());
        Product newProduct = Product.builder()
                .productName(dto.productName())
                .price(dto.price())
                .image(dto.image())
                .category(category)
                .build();
        return productRepository.save(newProduct);
    }

    public Inventory addInventory(Product newProduct, Integer currentQuantity) {
        return inventoryRepository.save(Inventory.builder().product(newProduct).currentQuantity(currentQuantity).build());
    }

    public Product updateProduct(ProductPostDto dto, String id) {
        Category category = categoryService.checkExistCategory(dto.categoryId());
        Product savedProduct = getProductById(id);
        Optional.ofNullable(dto.productName()).ifPresent(savedProduct::setProductName);
        Optional.ofNullable(dto.image()).ifPresent(savedProduct::setImage);
        Optional.ofNullable(dto.price()).ifPresent(savedProduct::setPrice);
        savedProduct.setCategory(category);
        return productRepository.save(savedProduct);
    }

    public void deleteProductById(String id) {
        getProductById(id);
        productRepository.deleteById(id);
    }
}
