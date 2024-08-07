package com.example.demo.dto;

import com.example.demo.exception.InvalidInputParameter;
import lombok.*;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderProductDto {
    @NonNull
    private String productId;
    @NonNull
    private Integer orderAmount;
    private String productName;
    private BigDecimal price;
}
