package com.example.demo.dto;

import org.springframework.lang.NonNull;

import java.math.BigDecimal;

public record ProductPostDto(String productName, BigDecimal price,
                             String image, Integer currentQuantity, String categoryId) {
}
