package com.example.placementicsbackend.dto.company;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CompanyRequest(
        @NotBlank
        @Size(max = 255)
        String name,

        @Size(max = 150)
        String industry
) {
}