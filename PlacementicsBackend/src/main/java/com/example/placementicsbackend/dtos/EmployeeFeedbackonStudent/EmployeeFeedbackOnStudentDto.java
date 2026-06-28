package com.example.placementicsbackend.dtos.EmployeeFeedbackonStudent;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeFeedbackOnStudentDto {

    private String id;
    private String employeeName = "";
  @JsonProperty("compnayName")
    private String compnayName = "";
    private String batchId = "";
    private String description = "";
}
