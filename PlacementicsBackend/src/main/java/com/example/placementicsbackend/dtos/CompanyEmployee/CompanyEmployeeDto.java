package com.example.placementicsbackend.dtos.CompanyEmployee;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyEmployeeDto {

    private String name = "";
    private String designation = "";
    private String email = "";
    private String profileUrl = "";
    @JsonProperty("companyname")
    private String companyname = "";
}
