package com.example.placementicsbackend.models.interviewrounds;

import com.example.placementicsbackend.models.enums.SystemDesignQuestionType;
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
