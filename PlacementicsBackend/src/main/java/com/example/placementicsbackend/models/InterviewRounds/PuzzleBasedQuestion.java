package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.DifficultyLevel;
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
