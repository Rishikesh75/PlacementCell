package com.example.placementicsbackend.dto.companyRequest;

import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.UUID;

public record CompanyRequest_Request(
        @NotNull
        UUID collegeCompanyId,

        @NotNull
        Instant interviewRequestedAt,

        @NotNull
        Integer numberOfPositions,

        @NotNull
        Integer numberOfRounds,

        String timings,

        Boolean breakfast,

        Boolean lunch,

        Boolean dinner,

        Integer numberOfPeopleAttending,

        String contactName,

        String contactEmail,

        String contactPhone,

        String announcementForStudents
) {
}