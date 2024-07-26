package com.example.demo.controller;

import com.example.demo.dto.UserLoginDto;
import com.example.demo.dto.UserRegisterDto;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/user")
public class UserController {

    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDto dto){
        User newUser = userService.registerUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserLoginDto dto){
        User user = userService.loginUser(dto);
        return ResponseEntity.ok(user);
    }
}
