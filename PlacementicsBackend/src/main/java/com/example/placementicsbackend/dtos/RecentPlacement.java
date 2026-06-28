package com.example.placementicsbackend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecentPlacement {

    private int placementId;
    private String id = "";
    private String studentName = "";
    private String companyName = "";
    private String jobTitle = "";
    private LocalDate placementDate;
    @JsonProperty("package")
    private String pkg = "";
}
