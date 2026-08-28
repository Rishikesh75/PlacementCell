package com.example.placementicsbackend.dto.student;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record StudentRequest(
        @NotNull
        UUID collegeId,

        @NotBlank
        @Size(max = 255)
        String name,

        @NotBlank
        @Email
        @Size(max = 255)
        String email,

        @NotBlank
        @Size(max = 100)
        String rollNo,

        @NotBlank
        @Size(max = 20)
        String batch,

        @Size(max = 150)
        String department
) {
}