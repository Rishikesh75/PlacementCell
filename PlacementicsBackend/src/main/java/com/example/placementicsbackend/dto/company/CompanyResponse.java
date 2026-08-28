package com.example.placementicsbackend.dto.company;

import java.time.Instant;
import java.util.UUID;

public record CompanyResponse(
        UUID id,
        String name,
        String industry,
        Instant createdAt,
        Instant updatedAt
) {
}