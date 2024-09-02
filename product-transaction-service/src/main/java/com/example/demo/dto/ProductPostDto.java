package com.example.demo.dto;

import org.springframework.lang.NonNull;

import java.math.BigDecimal;

public record ProductPostDto(@NonNull String productName, @NonNull BigDecimal price,
                             String image, @NonNull Integer currentQuantity, @NonNull String categoryId) {
}
