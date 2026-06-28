package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewInsights {

    private String companyId = "";
    private String companyName = "";
    private int totalFeedbacks;
    private boolean hasCodingRound;
    private boolean hasTechnicalRound;
    private boolean hasHRRound;
    private List<String> commonJobProfiles = new ArrayList<>();
    private List<String> commonLocations = new ArrayList<>();
    private RoundStatistics roundStats = new RoundStatistics();
}
