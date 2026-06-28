package com.example.placementicsbackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "alumni")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alumni {

    @Id
    @Column(name = "Id")
    private String id;

    @Column(name = "Name", nullable = false)
    private String name = "";

    @Column(name = "position", nullable = false)
    private String position = "";

    @Column(name = "Linkdinprofile", nullable = false)
    private String linkedinProfile = "";

    @Column(name = "CompanyId", nullable = false)
    private String companyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CompanyId", insertable = false, updatable = false)
    private Company company;
}
