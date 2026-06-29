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
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "foodReview")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer recordId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id", referencedColumnName = "Id")
    private Restaurents restaurant;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CompanyId", referencedColumnName = "CompanyId")
    private Company company;

    @Column(name = "Description", nullable = false)
    private String description = "";

    @Column(name = "Rating", nullable = false)
    private int rating;

    @Column(name = "Date", nullable = false)
    private LocalDate date = LocalDate.now();
}
