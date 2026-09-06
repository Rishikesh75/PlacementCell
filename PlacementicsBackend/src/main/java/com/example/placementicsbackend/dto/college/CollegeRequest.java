package com.example.placementicsbackend.dto.college;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CollegeRequest(
        @NotBlank(message = "College name is required")
        @Size(max = 255, message = "College name must be at most 255 characters")
        String name,

        String address,

        @Size(max = 50, message = "Contact must be at most 50 characters")
        String contact,

        @Size(max = 500, message = "Image file name must be at most 500 characters")
        String imageFileName,

        Boolean verifiedStatus
) {
}
