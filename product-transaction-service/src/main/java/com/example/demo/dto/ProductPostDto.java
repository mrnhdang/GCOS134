package com.example.demo.dto;

import java.math.BigDecimal;

public record ProductPostDto(String productName, BigDecimal price,
                             String image, Integer currentQuantity, String categoryId) {
}
