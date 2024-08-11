package com.example.demo.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartProductDto {
    @NonNull
    private String productId;
    @NonNull
    private Integer quantity;
}
