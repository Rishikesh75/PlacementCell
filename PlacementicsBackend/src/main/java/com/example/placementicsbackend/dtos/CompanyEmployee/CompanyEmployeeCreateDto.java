package com.example.placementicsbackend.dtos.CompanyEmployee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyEmployeeCreateDto {

    private String id = "";
    private String name = "";
    private String designation = "";
    private String email = "";
    private String companyId = "";
    private String profileUrl = "";
}
