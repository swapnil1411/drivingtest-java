package com.project.drivingtest.controller;

import com.project.drivingtest.model.AvailableAppointment;
import com.project.drivingtest.repository.AvailableAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AvailableAppointmentRepository availableAppointmentRepository;

    @PostMapping("/add-availability")
    public ResponseEntity<String> addAvailableAppointment(@RequestBody AvailableAppointment availableAppointment, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");


        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Unauthorized: Only admins can add appointments.");
        }

        availableAppointmentRepository.save(availableAppointment);
        return ResponseEntity.ok("Available appointment added.");
    }

    @GetMapping("/available-appointments")
    public List<AvailableAppointment> getAvailableAppointments() {
        return availableAppointmentRepository.findByIsAvailableTrue();
    }




}


