package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
    private Integer orderAmount = 0;
    private Integer holdAmount = 0;
    private String productName;
    private BigDecimal price;
    private String image;
}
