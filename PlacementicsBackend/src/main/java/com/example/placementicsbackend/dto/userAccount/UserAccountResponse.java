package com.example.placementicsbackend.dto.userAccount;

import com.example.placementicsbackend.models.enums.UserRole;

import java.time.Instant;
import java.util.UUID;

public record UserAccountResponse(
        UUID id,
        String email,
        UserRole role,
        UUID studentId,
        UUID teacherId,
        UUID alumniId,
        UUID tpoId,
        UUID collegeCompanyId,
        boolean enabled,
        Instant createdAt,
        Instant updatedAt
) {
}