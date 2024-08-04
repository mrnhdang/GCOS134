package com.example.demo.dto;

import org.springframework.lang.NonNull;

import java.math.BigDecimal;

public record ProductPostDto(@NonNull String name, @NonNull BigDecimal price) {
}
