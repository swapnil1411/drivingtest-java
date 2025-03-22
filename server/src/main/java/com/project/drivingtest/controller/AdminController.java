package com.project.drivingtest.controller;

import com.project.drivingtest.model.AvailableAppointment;
import com.project.drivingtest.repository.AvailableAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AvailableAppointmentRepository availableAppointmentRepository;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add-availability")
    public ResponseEntity<String> addAvailableAppointment(@RequestBody AvailableAppointment availableAppointment) {
        availableAppointmentRepository.save(availableAppointment);
        return ResponseEntity.ok("Available appointment added.");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/available-appointments")
    public List<AvailableAppointment> getAvailableAppointments() {
        return availableAppointmentRepository.findByIsAvailableTrue();
    }
}
