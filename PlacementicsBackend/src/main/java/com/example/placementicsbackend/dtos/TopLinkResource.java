package com.example.placementicsbackend.dtos;

import com.example.placementicsbackend.models.Enums.ResourceCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopLinkResource {

    private String title = "";
    private String url = "";
    private String description = "";
    private ResourceCategory category = ResourceCategory.DSA;
    private int recommendationCount;
}
