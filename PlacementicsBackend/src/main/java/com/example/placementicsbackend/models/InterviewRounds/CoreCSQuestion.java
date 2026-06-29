package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.CoreCSQuestionType;
import com.example.placementicsbackend.models.Enums.DifficultyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreCSQuestion {

    private CoreCSQuestionType questionType = CoreCSQuestionType.Other;
    private DifficultyLevel difficultyLevel;
    private String question = "";
}
