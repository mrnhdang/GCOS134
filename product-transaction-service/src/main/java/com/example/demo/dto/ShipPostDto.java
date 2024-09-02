package com.example.demo.dto;

import org.springframework.lang.NonNull;

import java.util.List;

public record ShipPostDto(@NonNull List<String> orders) {
}
