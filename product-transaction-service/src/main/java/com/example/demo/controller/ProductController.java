package com.example.demo.controller;

import com.example.demo.dto.ProductPostDto;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductController {
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam("query") String search) {
        List<Product> products = productService.searchProduct(search);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable("id") String categoryId) {
        List<Product> productsByCategory = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(productsByCategory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductDetail(@PathVariable("id") String id) {
        Product productDetail = productService.getProductById(id);
        return ResponseEntity.ok(productDetail);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody ProductPostDto dto) {
        Product newProduct = productService.addProduct(dto);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Product> editProduct(@RequestBody ProductPostDto dto, @PathVariable("id") String id) {
        Product savedProduct = productService.updateProduct(dto, id);
        return ResponseEntity.ok(savedProduct);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProduct(@PathVariable("id") String id) {
        productService.deleteProductById(id);
    }
}
