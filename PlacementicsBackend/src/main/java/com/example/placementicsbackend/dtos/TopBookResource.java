package com.example.placementicsbackend.dtos;

import com.example.placementicsbackend.models.Enums.ResourceCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopBookResource {

    private String bookName = "";
    private String author = "";
    private String description = "";
    private ResourceCategory category = ResourceCategory.DSA;
    private int recommendationCount;
}
