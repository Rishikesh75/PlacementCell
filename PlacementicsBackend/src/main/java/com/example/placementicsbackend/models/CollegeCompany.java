package com.example.placementicsbackend.models;


import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
    name = "college_company",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_college_company", columnNames = {"college_id", "company_id"}),
        @UniqueConstraint(name = "uq_college_company_key", columnNames = {"college_id", "company_key"})
    }
)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CollegeCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "company_key", nullable = false, length = 100)
    private String companyKey;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @OneToOne(mappedBy = "collegeCompany")
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
