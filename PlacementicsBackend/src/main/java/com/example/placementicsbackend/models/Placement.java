package com.example.placementicsbackend.models;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "placement")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "college_company_id", nullable = false)
    private CollegeCompany collegeCompany;

    @Column(name = "package", nullable = false, precision = 12, scale = 2)
    private BigDecimal packageAmount;

    @Column(nullable = false, length = 150)
    private String role;

    @Column(name = "placement_date", nullable = false)
    private LocalDate placementDate;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }
}