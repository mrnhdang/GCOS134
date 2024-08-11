package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "cart")
public class Cart {

    @Id
    private String id;

    @DocumentReference(lazy = true)
    private User user;

    @DocumentReference(lazy = true)
    private Product product;

    private Integer quantity;
}
