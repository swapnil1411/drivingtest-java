package com.project.drivingtest.controller;

import com.project.drivingtest.dto.AppointmentResponse;
import com.project.drivingtest.dto.DriverStatusResponse;
import com.project.drivingtest.model.*;
import com.project.drivingtest.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/driver")
public class DriverController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AvailableAppointmentRepository availableAppointmentRepository;


    @Autowired
    private ExamResultRepository examResultRepository; // ✅ Inject instance

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    @PostMapping("/book-appointment/{availableId}")
    public ResponseEntity<String> bookAppointment(@PathVariable Long availableId, HttpServletRequest request) {

        String email = (String) request.getAttribute("username");

        if (email == null) {
            return ResponseEntity.status(403).body("Unauthorized: No email found in token.");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        Optional<AvailableAppointment> availableOpt = availableAppointmentRepository.findById(availableId);

        if (userOpt.isPresent() && availableOpt.isPresent()) {
            User user = userOpt.get();


            if (user.getUserType() != UserType.DRIVER) {
                return ResponseEntity.status(403).body("Only drivers can book appointments.");
            }


            if (user.getCarDetails() == null) {
                return ResponseEntity.badRequest().body("Driver must provide car details before booking.");
            }

            AvailableAppointment available = availableOpt.get();
            if (!available.getIsAvailable()) {
                return ResponseEntity.badRequest().body("This appointment slot is already booked.");
            }


            Appointment appointment = new Appointment(available.getDate(), available.getTimeSlot(), user);
            appointmentRepository.save(appointment);


            available.setIsAvailable(false);
            availableAppointmentRepository.save(available);

            return ResponseEntity.ok("Appointment booked.");
        }

        return ResponseEntity.badRequest().body("Invalid user or appointment.");
    }

    @PostMapping("/add-car-details")
    public ResponseEntity<String> addCarDetails(@RequestBody CarDetails carDetails, HttpServletRequest request) {
        String email = (String) request.getAttribute("username"); // ✅ Extract from JWT
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();


            if (user.getUserType() != UserType.DRIVER) {
                return ResponseEntity.status(403).body("Only drivers can add car details.");
            }


            carDetails.setUser(user);
            carDetailsRepository.save(carDetails);

            return ResponseEntity.ok("Car details added successfully.");
        }

        return ResponseEntity.badRequest().body("Invalid user.");
    }

    @GetMapping("/status")
    public ResponseEntity<?> getDriverStatus(HttpServletRequest request) {
        String email = (String) request.getAttribute("username");

        if (email == null) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            boolean carAdded = user.getCarDetails() != null;
            boolean hasAppointment = appointmentRepository.findByDriver(user).isPresent(); // ✅ Fixed method name

            return ResponseEntity.ok(new DriverStatusResponse(carAdded, hasAppointment));
        }

        return ResponseEntity.badRequest().body("User not found");
    }


    @GetMapping("/booked-appointment")
    public ResponseEntity<?> getBookedAppointment(HttpServletRequest request) {
        String email = (String) request.getAttribute("username");

        if (email == null) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Optional<Appointment> appointmentOpt = appointmentRepository.findByDriver(user);

            if (appointmentOpt.isPresent()) {
                Appointment appointment = appointmentOpt.get();


                Optional<ExamResult> examResultOpt = examResultRepository.findByAppointment(appointment);


                AppointmentResponse response = new AppointmentResponse(
                        appointment.getId(),
                        appointment.getDate(),
                        appointment.getTimeSlot(),
                        examResultOpt.map(ExamResult::isPassed).orElse(null) // ✅ Get result if exists
                );

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.ok(Collections.singletonMap("message", "No booked appointment found."));
            }
        }

        return ResponseEntity.badRequest().body(Collections.singletonMap("error", "User not found"));
    }

}
