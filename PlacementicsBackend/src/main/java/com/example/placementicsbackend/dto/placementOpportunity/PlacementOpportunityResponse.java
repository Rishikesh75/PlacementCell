package com.example.placementicsbackend.dto.placementOpportunity;

import com.example.placementicsbackend.models.enums.OpportunityStatus;

import java.time.Instant;
import java.util.UUID;

public record PlacementOpportunityResponse(
        UUID id,
        UUID alumniId,
        UUID teacherId,
        UUID collegeCompanyId,
        String role,
        OpportunityStatus status,
        String eligibility,
        Instant deadline,
        Instant createdAt,
        Instant updatedAt
) {
}