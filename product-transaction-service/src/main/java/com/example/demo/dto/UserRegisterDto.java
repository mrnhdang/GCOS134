package com.example.demo.dto;

import java.math.BigDecimal;

public class UserRegisterDto {
    private String username;
    private String address;
    private String phoneNumber;
    private String password;
    private String email;
    private String role;
    private BigDecimal balance;

    public UserRegisterDto(String username, String address, String phoneNumber, String password, String email, String role, BigDecimal balance) {
        this.username = username;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.email = email;
        this.role = role;
        this.balance = balance;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}

