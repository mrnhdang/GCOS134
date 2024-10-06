package com.example.demo.dto;

import com.example.demo.entity.OrderStatus;
import com.example.demo.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class ShipDetailDto {
    private String id;
    private OrderStatus status;
    private LocalDate receivedDate;
    private User user;
    private List<OrderGetDetailDto> orders;
}
