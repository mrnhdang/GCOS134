package com.example.demo.dto;

import lombok.NonNull;

import java.util.List;

public record CartPostDto(@NonNull String userId, List<CartPostDto> products) {
}
