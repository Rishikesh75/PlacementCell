package com.example.placementicsbackend.models.interviewrounds;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SituationBasedQuestion {

    private String question = "";
    private String answer = "";
}
