package com.project.drivingtest.repository;

import com.project.drivingtest.model.Appointment;
import com.project.drivingtest.model.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    Optional<ExamResult> findByAppointment(Appointment appointment); // ✅
}
