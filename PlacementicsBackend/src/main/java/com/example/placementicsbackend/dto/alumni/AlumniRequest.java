package com.example.placementicsbackend.dto.alumni;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record AlumniRequest(
        @NotNull
        UUID collegeId,

        UUID companyId,

        @NotBlank
        @Size(max = 255)
        String name,

        @Email
        @Size(max = 255)
        String email,

        @Size(max = 150)
        String designation,

        @NotNull
        Integer passingYear
) {
}