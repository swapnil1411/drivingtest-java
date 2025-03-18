package com.project.drivingtest.dto;

public class DriverStatusResponse {
    private boolean carAdded;
    private boolean hasAppointment;

    public DriverStatusResponse(boolean carAdded, boolean hasAppointment) {
        this.carAdded = carAdded;
        this.hasAppointment = hasAppointment;
    }

    public boolean isCarAdded() {
        return carAdded;
    }

    public boolean isHasAppointment() {
        return hasAppointment;
    }
}
