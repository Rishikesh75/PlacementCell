package com.example.placementicsbackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "placementdrive")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlacementDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DriveId")
    private Integer driveId;

    @NotNull
    @Column(name = "CollegeId", nullable = false)
    private Integer collegeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CollegeId", insertable = false, updatable = false)
    private College college;

    @NotNull
    @Column(name = "CompanyId", nullable = false)
    private String companyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CompanyId", insertable = false, updatable = false)
    private Company company;

    @NotNull
    @Size(max = 200)
    @Column(name = "DriveTitle", nullable = false, length = 200)
    private String driveTitle = "";

    @Size(max = 2000)
    @Column(name = "Description", length = 2000)
    private String description = "";

    @NotNull
    @Column(name = "DriveDate", nullable = false)
    private LocalDate driveDate;

    @Column(name = "RegistrationDeadline")
    private LocalDate registrationDeadline;

    @Size(max = 500)
    @Column(name = "EligibilityCriteria", length = 500)
    private String eligibilityCriteria = "";

    @Size(max = 100)
    @Column(name = "Package", length = 100)
    private String packageOffer = "";

    @Size(max = 200)
    @Column(name = "JobRoles", length = 200)
    private String jobRoles = "";

    @Size(max = 100)
    @Column(name = "Location", length = 100)
    private String location = "";

    @Column(name = "MaxRegistrations")
    private Integer maxRegistrations;

    @Column(name = "CurrentRegistrations", nullable = false)
    private int currentRegistrations = 0;

    @Size(max = 50)
    @Column(name = "Status", length = 50)
    private String status = "Scheduled";

    @Column(name = "CreatedAt", nullable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "UpdatedAt")
    private Instant updatedAt;

    @Column(name = "IsActive", nullable = false)
    private boolean active = true;
}
