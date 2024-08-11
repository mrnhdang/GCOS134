package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CartService {
    private CartRepository cartRepository;


    public List<Cart> getCartByUser(String userId) {
        return cartRepository.findByUser(userId);
    }
}
