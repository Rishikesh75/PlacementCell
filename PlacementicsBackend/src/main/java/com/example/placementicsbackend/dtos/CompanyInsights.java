package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyInsights {

    private String companyId = "";
    private String companyName = "";
    private String industry = "";
    private int totalAlumniPlaced;
    private int totalFeedbacks;
    private List<String> jobProfiles = new ArrayList<>();
    private List<String> locations = new ArrayList<>();
    private BigDecimal averageCTC = BigDecimal.ZERO;
}
