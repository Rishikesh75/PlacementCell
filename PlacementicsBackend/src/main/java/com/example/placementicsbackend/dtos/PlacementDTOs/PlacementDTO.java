package com.example.placementicsbackend.dtos.PlacementDTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlacementDto {

    private String id = "";
    private String studentName = "";
    private String companyId = "";
    private String companyName = "";
    private String jobTitle = "";
    private LocalDate placementDate;
    @JsonProperty("package")
    private String pkg = "";
}
