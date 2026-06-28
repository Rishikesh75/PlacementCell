package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dtos.AlumniStatistics;
import com.example.placementicsbackend.dtos.CompanyInsights;
import com.example.placementicsbackend.dtos.CompanyRanking;
import com.example.placementicsbackend.dtos.DashboardStats;
import com.example.placementicsbackend.dtos.PlacementTrends;
import com.example.placementicsbackend.dtos.RecentPlacement;
import com.example.placementicsbackend.dtos.RecommendedResources;
import com.example.placementicsbackend.services.analytics.interfaces.IPlacementAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement-analytics")
@RequiredArgsConstructor
public class PlacementAnalyticsController {

    private final IPlacementAnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getDashboardStats());
    }

    @GetMapping("/companies/top/{count}")
    public ResponseEntity<List<CompanyRanking>> getTopCompanies(@PathVariable int count) {
        return ResponseEntity.ok(analyticsService.getTopCompaniesRanking(count));
    }

    @GetMapping("/companies/top")
    public ResponseEntity<List<CompanyRanking>> getTopCompanies() {
        return ResponseEntity.ok(analyticsService.getTopCompaniesRanking(10));
    }

    @GetMapping("/companies/{companyId}/insights")
    public ResponseEntity<CompanyInsights> getCompanyInsights(@PathVariable String companyId) {
        return ResponseEntity.ok(analyticsService.getCompanyInsights(companyId));
    }

    @GetMapping("/alumni/statistics")
    public ResponseEntity<AlumniStatistics> getAlumniStatistics() {
        return ResponseEntity.ok(analyticsService.getAlumniStatistics());
    }

    @GetMapping("/placements/recent/{count}")
    public ResponseEntity<List<RecentPlacement>> getRecentPlacements(@PathVariable int count) {
        return ResponseEntity.ok(analyticsService.getRecentPlacements(count));
    }

    @GetMapping("/placements/recent")
    public ResponseEntity<List<RecentPlacement>> getRecentPlacements() {
        return ResponseEntity.ok(analyticsService.getRecentPlacements(10));
    }

    @GetMapping("/trends")
    public ResponseEntity<PlacementTrends> getPlacementTrends() {
        return ResponseEntity.ok(analyticsService.getPlacementTrends());
    }

    @GetMapping("/resources/recommended/{count}")
    public ResponseEntity<RecommendedResources> getTopRecommendedResources(@PathVariable int count) {
        return ResponseEntity.ok(analyticsService.getTopRecommendedResources(count));
    }

    @GetMapping("/resources/recommended")
    public ResponseEntity<RecommendedResources> getTopRecommendedResources() {
        return ResponseEntity.ok(analyticsService.getTopRecommendedResources(10));
    }
}
