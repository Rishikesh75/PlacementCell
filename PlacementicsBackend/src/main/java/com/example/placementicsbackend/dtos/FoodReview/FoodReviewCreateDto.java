package com.example.placementicsbackend.dtos.FoodReview;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodReviewCreateDto {

    private int id;
    private String companyId = "";
    private String description = "";
    private int rating;
    private LocalDate date;
}
