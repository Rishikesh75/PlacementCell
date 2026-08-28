package com.example.placementicsbackend.dto.userAccount;

import com.example.placementicsbackend.models.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record UserAccountRequest(
        @NotBlank
        @Email
        @Size(max = 255)
        String email,

        @NotBlank
        String password,

        @NotNull
        UserRole role,

        UUID studentId,

        UUID teacherId,

        UUID alumniId,

        UUID tpoId,

        UUID collegeCompanyId,

        Boolean enabled
) {
}