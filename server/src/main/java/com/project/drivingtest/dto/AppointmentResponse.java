package com.project.drivingtest.dto;

import java.util.Date;

public class AppointmentResponse {
    private Long id;
    private Date date;
    private String timeSlot;
    private Boolean examResult; // ✅ `true` if passed, `false` if failed, `null` if pending

    public AppointmentResponse(Long id, Date date, String timeSlot, Boolean examResult) {
        this.id = id;
        this.date = date;
        this.timeSlot = timeSlot;
        this.examResult = examResult;
    }

    public Long getId() { return id; }
    public Date getDate() { return date; }
    public String getTimeSlot() { return timeSlot; }
    public Boolean getExamResult() { return examResult; }
}
