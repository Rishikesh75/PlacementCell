package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.ResourceCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkResource {

    private String title = "";
    private String url = "";
    private String description = "";
    private ResourceCategory category = ResourceCategory.DSA;
}
