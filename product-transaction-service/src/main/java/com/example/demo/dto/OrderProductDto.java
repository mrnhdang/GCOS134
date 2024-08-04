package com.example.demo.dto;

import org.springframework.lang.NonNull;

public record OrderProductDto(@NonNull String productId, @NonNull Integer orderAmount) {
}
