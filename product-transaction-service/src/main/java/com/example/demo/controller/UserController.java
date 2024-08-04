package com.example.demo.controller;

import com.example.demo.dto.UserLoginDto;
import com.example.demo.dto.UserRegisterDto;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/user")
public class UserController {

    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<User>> getUser() {
        List<User> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDto dto) {
        User newUser = userService.registerUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserLoginDto dto) {
        User user = userService.loginUser(dto);
        return ResponseEntity.ok(user);
    }
    @PatchMapping("/edit/{id}")
    public ResponseEntity<User> editUser(@RequestBody UserRegisterDto dto, @PathVariable("id") String id) {
        User savedUser = userService.updateUser(dto, id);
        return ResponseEntity.ok(savedUser);
    }
    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable("id") String id){
        userService.deleteUserById(id);
    }

    @GetMapping("/{id}/order")
    public ResponseEntity<?> getUserOrders(@PathVariable("id") String userId) {
        return ResponseEntity.ok(userService.getUserOrders(userId));
    }
}
