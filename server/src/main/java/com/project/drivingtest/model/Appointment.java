package com.project.drivingtest.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
    private String timeSlot;
    private Boolean examResult = null;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private User driver;


    public Appointment() {}

    public Appointment(Date date, String timeSlot, User driver) {
        this.date = date;
        this.timeSlot = timeSlot;
        this.driver = driver;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public Boolean getExamResult() { return examResult; }
    public void setExamResult(Boolean examResult) { this.examResult = examResult; }

    public User getDriver() { return driver; }
    public void setDriver(User driver) { this.driver = driver; }
}
