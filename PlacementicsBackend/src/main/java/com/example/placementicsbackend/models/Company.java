package com.example.placementicsbackend.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Entity
@Table(name = "company", uniqueConstraints = @UniqueConstraint(name = "uq_company_name", columnNames = "name"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, length = 255)
    private String name;
    @Column(length = 150)
    private String industry;
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
    @OneToMany(mappedBy = "company")
    @Builder.Default
    private List<Alumni> alumni = new ArrayList<>();
    @OneToMany(mappedBy = "company")
    @Builder.Default
    private List<CollegeCompany> collegeCompanies = new ArrayList<>();
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