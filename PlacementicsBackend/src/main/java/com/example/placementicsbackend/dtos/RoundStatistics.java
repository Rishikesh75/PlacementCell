package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoundStatistics {

    private int codingRoundCount;
    private int technicalRoundCount;
    private int hRRoundCount;
}
