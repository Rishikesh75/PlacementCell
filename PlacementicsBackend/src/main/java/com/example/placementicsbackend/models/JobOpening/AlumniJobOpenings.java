package com.example.placementicsbackend.models.jobopening;

import com.example.placementicsbackend.models.Alumni;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.CompanyEmployee;
import com.example.placementicsbackend.models.enums.PostedByType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "alumnijobposition")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumniJobOpenings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "CompanyId", nullable = false)
    private String companyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CompanyId", insertable = false, updatable = false)
    private Company company;

    @Column(name = "JobTitle", nullable = false)
    private String jobTitle = "";

    @Column(name = "PostedDate", nullable = false)
    private LocalDate postedDate;

    @Column(name = "Package", nullable = false)
    private String packageOffer = "";

    @Column(name = "JobUrl", nullable = false)
    private String jobUrl = "";

    @Column(name = "PostedByProfileUrl", nullable = false)
    private String postedByProfileUrl = "";

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "PostedBytype", nullable = false)
    private PostedByType postedBy;

    @Column(name = "PostedId")
    private String postedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PostedId", insertable = false, updatable = false)
    private Alumni postedByAlumni;

    @Column(name = "PostedByEmployeeId")
    private String postedByEmployeeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PostedByEmployeeId", insertable = false, updatable = false)
    private CompanyEmployee postedByEmployee;
}
