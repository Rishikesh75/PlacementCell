package com.example.placementicsbackend.models.interviewrounds;

import com.example.placementicsbackend.models.enums.DifficultyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PuzzleBasedQuestion {

    private DifficultyLevel difficultyLevel;
    private String question = "";
}
