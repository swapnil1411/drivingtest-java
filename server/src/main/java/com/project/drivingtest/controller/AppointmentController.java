package com.project.drivingtest.controller;

import com.project.drivingtest.model.AvailableAppointment;
import com.project.drivingtest.repository.AvailableAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AvailableAppointmentRepository availableAppointmentRepository;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/available")
    public List<AvailableAppointment> getAvailableAppointments() {
        return availableAppointmentRepository.findByIsAvailableTrue();
    }
}