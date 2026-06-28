package com.example.placementicsbackend.dtos.EmployeeFeedbackonStudent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeFeedbackOnStudentCreateDto {

    private String companyEmpId = "";
    private String batchId = "";
    private String description = "";
}
