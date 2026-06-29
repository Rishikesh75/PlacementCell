package com.example.placementicsbackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "college")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Size(max = 200)
    @Column(name = "CollegeName", nullable = false, length = 200)
    private String collegeName = "";

    @Size(max = 500)
    @Column(name = "Address", length = 500)
    private String address = "";

    @Size(max = 100)
    @Column(name = "City", length = 100)
    private String city = "";

    @Size(max = 100)
    @Column(name = "State", length = 100)
    private String state = "";

    @NotNull
    @Column(name = "AdminID", nullable = false)
    private String adminId = "";

    @Column(name = "RegisteredOn")
    private Instant registeredOn = Instant.now();
}
