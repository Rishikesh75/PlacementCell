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
@Table(name = "companyemployee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyEmployee {

    @Id
    @Column(name = "EmployeeId")
    private String employeeId;

    @Column(name = "name", nullable = false)
    private String name = "";

    @Column(name = "Designation", nullable = false)
    private String designation = "";

    @Column(name = "Email", nullable = false)
    private String email = "";

    @Column(name = "CompanyId", nullable = false)
    private String companyId;

    @Column(name = "ProfileUrl", nullable = false)
    private String profileUrl = "";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CompanyId", insertable = false, updatable = false)
    private Company company;
}
