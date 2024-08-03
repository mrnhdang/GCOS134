package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    public Optional<User> findByUsername(String username);

    public Optional<User> findByUsernameAndPassword(String username, String password);
}
