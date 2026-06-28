package com.example.placementicsbackend.models.interviewrounds;

import com.example.placementicsbackend.models.enums.DSAQuestionType;
import com.example.placementicsbackend.models.enums.DifficultyLevel;
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
