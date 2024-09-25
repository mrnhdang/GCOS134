package com.example.demo.dto;

import com.example.demo.entity.BillStatus;
import com.example.demo.entity.User;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillGetDetailDto {
    private String id;
    private String orderId;
    private BillStatus status;
    private LocalDate payDate;
    private String username;
    private BigDecimal totalPrice;
    private List<OrderProductDto> products;
}
