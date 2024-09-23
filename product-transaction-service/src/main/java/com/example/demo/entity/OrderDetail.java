package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "order_detail")
public class OrderDetail {
    @Id
    private String id;

    @DocumentReference(lazy = true)
    private Order order;

    @DocumentReference(lazy = true)
    private Product product;

    private Integer totalAmount;
    private Integer holdAmount;
}
