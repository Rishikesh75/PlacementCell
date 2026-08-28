package com.example.placementicsbackend.dto.collegeCompany;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CollegeCompanyRequest(
        @NotNull
        UUID collegeId,

        @NotNull
        UUID companyId,

        @NotBlank
        @Size(max = 100)
        String companyKey
) {
}