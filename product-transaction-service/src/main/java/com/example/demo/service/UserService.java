package com.example.demo.service;

import com.example.demo.dto.UserLoginDto;
import com.example.demo.dto.UserRegisterDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;



    public User registerUser(UserRegisterDto dto){
        User user = User.builder().username(dto.getUsername())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .build();
        return userRepository.save(user);
    }

    public User loginUser(UserLoginDto dto){
        User user = userRepository.findByUsernameAndPassword(dto.getUsername(), dto.getPassword())
                .orElseThrow(()-> new RuntimeException("Invalid username or password"));
        return user;
    }
    public User getUserByUsername(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User not found"));
    }

}
