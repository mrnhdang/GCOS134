package com.example.demo.entity;

import com.mongodb.lang.Nullable;
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

    @DocumentReference
    private Ship ship;

    @DocumentReference
    private User user;

    @DocumentReference
    private Bill bill;

    @DocumentReference
    private List<Product> products;
}
