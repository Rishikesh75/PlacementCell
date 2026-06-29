package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IndustryDistribution {

    private String industry = "";
    private int count;
    private double percentage;
}
