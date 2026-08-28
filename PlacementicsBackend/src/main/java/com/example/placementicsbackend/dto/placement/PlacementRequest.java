package com.example.placementicsbackend.dto.placement;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record PlacementRequest(
        @NotNull
        UUID studentId,

        @NotNull
        UUID collegeCompanyId,

        @NotNull
        BigDecimal packageAmount,

        @Size(max = 150)
        String role,

        @NotNull
        LocalDate placementDate
) {
}