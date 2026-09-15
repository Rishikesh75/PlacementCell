package com.example.placementicsbackend.models;

import com.example.placementicsbackend.models.enums.RegistrationRole;
import com.example.placementicsbackend.models.enums.RegistrationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "registration_request")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private RegistrationRole role;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "roll_no", length = 100)
    private String rollNo;

    @Column(length = 20)
    private String batch;

    @Column(length = 150)
    private String department;

    @Column(name = "passing_year")
    private Integer passingYear;

    @Column(name = "company_name", length = 255)
    private String companyName;

    @Column(name = "company_key", length = 100)
    private String companyKey;

    @Column(length = 150)
    private String designation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private RegistrationStatus status = RegistrationStatus.PENDING;

    @Column(name = "submitted_at", nullable = false, updatable = false)
    private Instant submittedAt;

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @PrePersist
    void onCreate() {
        if (submittedAt == null) {
            submittedAt = Instant.now();
        }
    }
}
