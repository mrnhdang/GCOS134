package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "purchase_order")
public class Order {
    @Id
    private String id;
    private LocalDate purchaseDate;
    private OrderStatus status;

    @DocumentReference(lazy = true)
    private Ship ship;

    @DocumentReference(lazy = true)
    private User user;

    @DocumentReference(lazy = true)
    private Bill bill;

    @DocumentReference(lazy = true)
    private List<Product> products;
}
