package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.DSAQuestionType;
import com.example.placementicsbackend.models.Enums.DifficultyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DSAQuestion {

    private DSAQuestionType questionType = DSAQuestionType.Others;
    private DifficultyLevel difficultyLevel;
    private String question = "";
}
