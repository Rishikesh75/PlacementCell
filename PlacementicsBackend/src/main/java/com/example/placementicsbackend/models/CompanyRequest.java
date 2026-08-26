package com.example.placementicsbackend.models;

import com.example.placementicsbackend.models.enums.CompanyRequestStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "company_request")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CompanyRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "college_company_id", nullable = false)
    private CollegeCompany collegeCompany;

    @Column(name = "interview_requested_at", nullable = false)
    private Instant interviewRequestedAt;

    @Column(name = "number_of_positions", nullable = false)
    private Integer numberOfPositions;

    @Column(name = "number_of_rounds", nullable = false)
    private Integer numberOfRounds;

    @Column(columnDefinition = "TEXT")
    private String timings;

    @Column(nullable = false)
    @Builder.Default
    private boolean breakfast = false;

    @Column(nullable = false)
    @Builder.Default
    private boolean lunch = false;

    @Column(nullable = false)
    @Builder.Default
    private boolean dinner = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private CompanyRequestStatus status = CompanyRequestStatus.PENDING;

    @Column(name = "number_of_people_attending")
    private Integer numberOfPeopleAttending;

    @Column(name = "contact_name", length = 255)
    private String contactName;

    @Column(name = "contact_email", length = 255)
    private String contactEmail;

    @Column(name = "contact_phone", length = 50)
    private String contactPhone;

    @Column(name = "announcement_for_students", columnDefinition = "TEXT")
    private String announcementForStudents;

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