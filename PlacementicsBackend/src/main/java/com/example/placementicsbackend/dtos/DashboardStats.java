package com.example.placementicsbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {

    private int totalStudents;
    private int totalAlumni;
    private int totalCompanies;
    private int totalFeedbacks;
    private int activeOpenings;
    private int totalTeachers;
    private List<RecentPlacement> recentPlacements = new ArrayList<>();
}
