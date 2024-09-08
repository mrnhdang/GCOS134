package com.example.demo.dto;

import org.springframework.lang.NonNull;

import java.math.BigDecimal;

public record BillPaymentDto(@NonNull String userId, @NonNull BigDecimal payPrice) {
}
