package com.example.demo.dto;

import com.example.demo.entity.OrderStatus;
import com.example.demo.entity.User;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderGetDetailDto {
    private String id;
    private LocalDate purchaseDate;
    private OrderStatus status;
    private String billId;
    private User user;
    private List<OrderProductDto> products;
}
