package com.example.placementicsbackend.dto.feedback;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record InterviewRoundDto(
        @NotBlank
        String heading,

        List<String> questions
) {
}