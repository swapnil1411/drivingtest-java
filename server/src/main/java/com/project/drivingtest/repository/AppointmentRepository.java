package com.project.drivingtest.repository;

import com.project.drivingtest.model.Appointment;
import com.project.drivingtest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByDriver(User driver);
    boolean existsByDriver(User driver);

}
