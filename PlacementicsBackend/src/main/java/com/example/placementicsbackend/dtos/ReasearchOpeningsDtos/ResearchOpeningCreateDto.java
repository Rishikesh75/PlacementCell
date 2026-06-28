package com.example.placementicsbackend.dtos.ReasearchOpeningsDtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchOpeningCreateDto {

    private String id = "";
    private String title = "";
    private String description = "";
    private String department = "";
  @JsonProperty("researcharea")
    private String researcharea = "";
    private String stipend = "";
    private String duration = "";
    private LocalDate postedDate;
    private LocalDate deadLine;
  @JsonProperty("link")
    private String link = "";
    private boolean isActive = true;
}
