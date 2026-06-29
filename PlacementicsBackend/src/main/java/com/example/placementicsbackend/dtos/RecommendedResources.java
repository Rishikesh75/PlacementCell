package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendedResources {

    private int totalFeedbacksWithResources;
    private List<TopLinkResource> topLinks = new ArrayList<>();
    private List<TopBookResource> topBooks = new ArrayList<>();
}
