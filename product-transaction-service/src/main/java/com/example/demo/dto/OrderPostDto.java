package com.example.demo.dto;

import org.springframework.lang.NonNull;

import java.util.List;

public record OrderPostDto(@NonNull String userId, List<OrderProductDto> products) {
}
