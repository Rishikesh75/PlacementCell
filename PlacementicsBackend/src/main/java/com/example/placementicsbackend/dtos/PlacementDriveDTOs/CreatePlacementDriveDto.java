package com.example.placementicsbackend.dtos.PlacementDriveDTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePlacementDriveDto {

    private int collegeId;
    private String companyId = "";
    private String driveTitle = "";
    private String description = "";
    private LocalDate driveDate;
    private LocalDate registrationDeadline;
    private String eligibilityCriteria = "";
    @JsonProperty("package")
    private String pkg = "";
    private String jobRoles = "";
    private String location = "";
    private Integer maxRegistrations;
    private boolean isActive = true;
}
