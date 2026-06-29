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
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @Column(name = "Id")
    private String id;

    @Column(name = "password", nullable = false)
    private String password = "password123";

    @Column(name = "name", nullable = false)
    private String name = "";

    @Column(name = "major", nullable = false)
    private String major = "";

    @Column(name = "Email", nullable = false)
    private String email = "";

    @Column(name = "GraduationYear", nullable = false)
    private Long graduationYear;

    @Column(name = "PhoneNo", nullable = false)
    private String phoneNo = "";
}
