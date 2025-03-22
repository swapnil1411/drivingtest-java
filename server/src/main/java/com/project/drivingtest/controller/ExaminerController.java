package com.project.drivingtest.controller;

import com.project.drivingtest.model.Appointment;
import com.project.drivingtest.model.ExamResult;
import com.project.drivingtest.model.User;
import com.project.drivingtest.repository.AppointmentRepository;
import com.project.drivingtest.repository.ExamResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/examiner")
public class ExaminerController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ExamResultRepository examResultRepository;
    @PreAuthorize("hasAuthority('EXAMINER')")
    @GetMapping("/appointments")
    public List<Appointment> getPendingAppointments() {
        List<Appointment> allAppointments = appointmentRepository.findAll();
        return allAppointments.stream()
                .filter(appt -> examResultRepository.findByAppointment(appt)
                        .map(result -> !result.isPassed()) // Exclude passed exams
                        .orElse(true)) // Include if no result exists
                .collect(Collectors.toList());
    }


    @PreAuthorize("hasAuthority('EXAMINER')")
    @PostMapping("/update-result/{appointmentId}/{passed}")
    public ResponseEntity<String> updateExamResult(
            @PathVariable Long appointmentId,
            @PathVariable boolean passed,
            HttpServletRequest request) {


        String role = (String) request.getAttribute("role");
        if (!"EXAMINER".equals(role)) {
            return ResponseEntity.status(403).body("Unauthorized: Only examiners can update results.");
        }


        Optional<Appointment> appointmentOpt = appointmentRepository.findById(appointmentId);
        if (appointmentOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Appointment not found.");
        }

        Appointment appointment = appointmentOpt.get();
        User driver = appointment.getDriver();


        ExamResult result = examResultRepository.findByAppointment(appointment)
                .orElse(new ExamResult(appointment, driver, passed));
        result.setPassed(passed);
        examResultRepository.save(result);

        return ResponseEntity.ok("Exam result updated for driver: " + driver.getEmail());
    }
}
