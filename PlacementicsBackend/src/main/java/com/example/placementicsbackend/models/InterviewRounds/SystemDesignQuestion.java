package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.SystemDesignQuestionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemDesignQuestion {

    private SystemDesignQuestionType questionType = SystemDesignQuestionType.LLD;
    private String question = "";
}
