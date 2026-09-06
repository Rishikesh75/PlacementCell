package com.example.placementicsbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "college", uniqueConstraints = @UniqueConstraint(name = "uq_college_name", columnNames = "name"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 50)
    private String contact;

    @Column(name = "image_file_name", length = 500)
    private String imageFileName;

    @Column(name = "verified_status", nullable = false)
    @Builder.Default
    private boolean verifiedStatus = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "college")
    @Builder.Default
    private List<Student> students = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "college")
    @Builder.Default
    private List<Alumni> alumni = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "college")
    @Builder.Default
    private List<Teacher> teachers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "college")
    @Builder.Default
    private List<TPO> tpos = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "college")
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