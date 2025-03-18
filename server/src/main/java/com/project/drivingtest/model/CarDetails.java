package com.project.drivingtest.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "car_details")
public class CarDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String carModel;
    private String licensePlate;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    @JsonBackReference
    private User user;

    public CarDetails() {}

    public CarDetails(String carModel, String licensePlate, User user) {
        this.carModel = carModel;
        this.licensePlate = licensePlate;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getCarModel() { return carModel; }
    public void setCarModel(String carModel) { this.carModel = carModel; }
    public String getLicensePlate() { return licensePlate; }
    public void setLicensePlate(String licensePlate) { this.licensePlate = licensePlate; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
