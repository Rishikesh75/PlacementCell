package com.example.placementicsbackend.dto.registration;

import com.example.placementicsbackend.models.enums.RegistrationRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record RegistrationRequestCreate(
        @NotNull UUID collegeId,
        @NotNull RegistrationRole role,
        @NotBlank @Size(max = 255) String name,
        @NotBlank @Email @Size(max = 255) String email,
        @NotBlank @Size(min = 8, max = 255) String password,
        @Size(max = 100) String rollNo,
        @Size(max = 20) String batch,
        @Size(max = 150) String department,
        Integer passingYear,
        @Size(max = 255) String companyName,
        @Size(max = 100) String companyKey,
        @Size(max = 150) String designation
) {
}
