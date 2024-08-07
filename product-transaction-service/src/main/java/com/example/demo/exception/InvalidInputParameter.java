package com.example.demo.exception;

public class InvalidInputParameter extends RuntimeException{
    public InvalidInputParameter(String message) {
        super(message);
    }
}
