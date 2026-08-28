package com.example.placementicsbackend.dto.teacher;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record TeacherRequest(
        @NotNull
        UUID collegeId,

        @NotBlank
        @Size(max = 255)
        String name,

        @NotBlank
        @Email
        @Size(max = 255)
        String email,

        @Size(max = 150)
        String department,

        Integer joiningYear
) {
}