package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlacementTrends {

    private int totalPlacements;
    private List<YearlyPlacementData> yearlyData = new ArrayList<>();
}
