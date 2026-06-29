package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumniStatistics {

    private int totalAlumni;
    private int uniqueCompanies;
    private List<CompanyAlumniCount> companyWiseCount = new ArrayList<>();
}
