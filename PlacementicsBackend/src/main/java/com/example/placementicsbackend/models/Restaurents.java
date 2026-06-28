package com.example.placementicsbackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "restaurents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name = "";

    @Column(name = "Contact", nullable = false)
    private String contact = "";

    @Column(name = "Address", nullable = false)
    private String address = "";

    @Column(name = "Rating", nullable = false)
    private String rating = "";
}
