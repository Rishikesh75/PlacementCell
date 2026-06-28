package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyPlacementData {

    private int month;
    private String monthName = "";
    private int placementCount;
    private List<PositionCount> positionWiseCount = new ArrayList<>();
}
