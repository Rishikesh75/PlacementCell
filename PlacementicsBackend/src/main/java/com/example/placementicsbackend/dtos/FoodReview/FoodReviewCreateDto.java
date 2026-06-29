package com.example.placementicsbackend.dtos.FoodReview;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodReviewCreateDto {

    @JsonProperty("restaurentId")
    @JsonAlias("id")
    private int restaurentId;

    private String companyId = "";
    private String description = "";
    private int rating;
    private LocalDate date;
}
