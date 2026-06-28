package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRanking {

    private String companyId = "";
    private String companyName = "";
    private String industry = "";
    private int totalPlacements;
    private int rank;
    private String averagePackage = "";
    private List<YearlyPlacementCount> yearlyPlacements = new ArrayList<>();
}
