package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {
    private CartService cartService;

    @GetMapping("/{id}/user")
    public ResponseEntity<List<Cart>> getCartByUser(@PathVariable("id") String userId) {
        List<Cart> cartItems = cartService.getCartByUser(userId);
        return ResponseEntity.ok(cartItems);
    }

}
