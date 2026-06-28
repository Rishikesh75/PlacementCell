package com.example.placementicsbackend.dtos.FoodReview;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodReviewDto {

    private int id;
    @JsonProperty("restaurentName")
    private String restaurentName = "";
    @JsonProperty("restaurentId")
    private int restaurentId;
    private String companyName = "";
    private String companyId = "";
    private String description = "";
    private int rating;
    private LocalDate date;
}
