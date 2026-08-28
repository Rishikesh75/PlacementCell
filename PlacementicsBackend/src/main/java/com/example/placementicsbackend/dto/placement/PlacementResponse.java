package com.example.placementicsbackend.dto.placement;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record PlacementResponse(
        UUID id,
        UUID studentId,
        UUID collegeCompanyId,
        BigDecimal packageAmount,
        String role,
        LocalDate placementDate,
        Instant createdAt,
        Instant updatedAt
) {
}