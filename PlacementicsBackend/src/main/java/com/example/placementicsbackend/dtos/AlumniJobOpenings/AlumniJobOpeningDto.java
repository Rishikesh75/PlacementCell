package com.example.placementicsbackend.dtos.AlumniJobOpenings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumniJobOpeningDto {

    private String companyName = "";
    private String jobTitle = "";
    private String postedDate = "";
    @JsonProperty("package")
    private String pkg = "";
    private String jobUrl = "";
    private String postedByProfileUrl = "";
}
