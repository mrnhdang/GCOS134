package com.example.demo.dto;

import org.springframework.lang.NonNull;

import java.util.List;

public record ShipPostDto(@NonNull String userId, @NonNull List<String> orders) {
}
