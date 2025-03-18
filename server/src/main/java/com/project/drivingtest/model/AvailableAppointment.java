package com.project.drivingtest.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "available_appointments")
public class AvailableAppointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
    private String timeSlot;
    private Boolean isAvailable = true;


    public AvailableAppointment() {}

    public AvailableAppointment(Date date, String timeSlot) {
        this.date = date;
        this.timeSlot = timeSlot;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
}
