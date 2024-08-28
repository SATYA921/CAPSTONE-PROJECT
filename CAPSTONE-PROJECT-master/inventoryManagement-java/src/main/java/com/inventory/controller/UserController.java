package com.inventory.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.inventory.entity.User;
import com.inventory.service.UserService;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        boolean isValidUser = userService.validateUser(user.getUsername(), user.getPassword());
        if (isValidUser) {
            return ResponseEntity.ok("Login successful! Redirecting to inventory management dashboard...");
        } else {
            return ResponseEntity.status(401).body("Invalid UserID or Password");
        }
    }
}