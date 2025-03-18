package com.project.drivingtest.service;

import com.project.drivingtest.config.JwtUtil;
import com.project.drivingtest.model.User;
import com.project.drivingtest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Generate JWT Token with role
                return jwtUtil.generateToken(user.getEmail(), user.getUserType().name());
            }
        }
        throw new RuntimeException("Invalid email or password");
    }
}
