package com.example.placementicsbackend.dto.placementOpportunity;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public record PlacementOpportunityRequest(
        UUID alumniId,

        UUID teacherId,

        @NotNull
        UUID collegeCompanyId,

        @Size(max = 150)
        String role,

        String eligibility,

        Instant deadline
) {
}