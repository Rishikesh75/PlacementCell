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
@Table(name = "teacher")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @Column(name = "Id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name = "";

    @Column(name = "Email", nullable = false)
    private String email = "";

    @Column(name = "Department", nullable = false)
    private String department = "";
}
