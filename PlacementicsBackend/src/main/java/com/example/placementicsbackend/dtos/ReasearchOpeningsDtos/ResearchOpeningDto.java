package com.example.placementicsbackend.dtos.ReasearchOpeningsDtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchOpeningDto {

    private String id = "";
    @JsonProperty("teachername")
    private String teachername = "";
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
    @JsonProperty("isActive")
    private String active = "true";
}
