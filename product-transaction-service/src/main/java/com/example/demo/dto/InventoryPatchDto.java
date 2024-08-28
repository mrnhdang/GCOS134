package com.example.demo.dto;

import org.springframework.lang.NonNull;

public record InventoryPatchDto(@NonNull Integer currentAmount) {
}
