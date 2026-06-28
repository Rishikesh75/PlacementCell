package com.example.placementicsbackend.dtos.AlumniDtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumniDto {

    private String id = "";
    private String name = "";
    private String position = "";
    private String linkedInProfile = "";
    private String companyId = "";
    private String companyName = "";

}