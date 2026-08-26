package com.example.placementicsbackend.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Entity
@Table(
    name = "student",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_student_email", columnNames = "email"),
        @UniqueConstraint(name = "uq_student_roll_no", columnNames = {"college_id", "roll_no"})
    }
)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "college_id", nullable = false)
    private College college;
    @Column(nullable = false, length = 255)
    private String name;
    @Column(nullable = false, length = 255)
    private String email;
    @Column(name = "roll_no", nullable = false, length = 100)
    private String rollNo;
    @Column(nullable = false, length = 20)
    private String batch;
    @Column(length = 150)
    private String department;
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
    @OneToMany(mappedBy = "student")
    @Builder.Default
    private List<Placement> placements = new ArrayList<>();
    @OneToOne(mappedBy = "student")
    private UserAccount userAccount;
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