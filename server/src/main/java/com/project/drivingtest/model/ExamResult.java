package com.project.drivingtest.model;
import jakarta.persistence.*;

@Entity
@Table(name = "exam_results")
public class ExamResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "appointment_id", unique = true, nullable = false)
    private Appointment appointment;  // ✅ Result is tied to an appointment

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private User driver;

    private boolean passed;

    public ExamResult() {}

    public ExamResult(Appointment appointment, User driver, boolean passed) {
        this.appointment = appointment;
        this.driver = driver;
        this.passed = passed;
    }

    public Long getId() { return id; }
    public Appointment getAppointment() { return appointment; }
    public User getDriver() { return driver; }
    public boolean isPassed() { return passed; }
    public void setPassed(boolean passed) { this.passed = passed; }
}
