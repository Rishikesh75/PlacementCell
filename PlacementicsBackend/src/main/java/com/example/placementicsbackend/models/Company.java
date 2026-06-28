package com.example.placementicsbackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "company")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @Column(name = "CompanyId")
    private String companyId;

    @Column(name = "CompanyName", nullable = false)
    private String companyName = "";

    @Column(name = "Industry", nullable = false)
    private String industry = "";
}
