package com.project.drivingtest.repository;

import com.project.drivingtest.model.AvailableAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AvailableAppointmentRepository extends JpaRepository<AvailableAppointment, Long> {
    List<AvailableAppointment> findByIsAvailableTrue();
    AvailableAppointment findByDateAndTimeSlot(Date date, String timeSlot);
}
