package com.example.placementicsbackend.controllers;
import com.example.dto.AlumniStatistics;
import com.example.dto.CompanyInsights;
import com.example.dto.CompanyRanking;
import com.example.dto.DashboardStats;
import com.example.dto.PlacementTrends;
import com.example.dto.RecentPlacement;
import com.example.dto.RecommendedResources;
import com.example.service.PlacementAnalyticsService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement-analytics")
public class PlacementAnalyticsController {

    private final PlacementAnalyticsService analyticsService;

    public PlacementAnalyticsController(
            PlacementAnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    /**
     * Get comprehensive dashboard statistics
     */
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats() {

        DashboardStats stats =
                analyticsService.getDashboardStats();

        return ResponseEntity.ok(stats);
    }

    /**
     * Get top hiring companies
     */
    @GetMapping("/companies/top/{count}")
    public ResponseEntity<List<CompanyRanking>> getTopCompanies(
            @PathVariable int count) {

        List<CompanyRanking> rankings =
                analyticsService.getTopCompaniesRanking(count);

        return ResponseEntity.ok(rankings);
    }

    /**
     * Default Top 10 Companies
     */
    @GetMapping("/companies/top")
    public ResponseEntity<List<CompanyRanking>> getTopCompanies() {

        List<CompanyRanking> rankings =
                analyticsService.getTopCompaniesRanking(10);

        return ResponseEntity.ok(rankings);
    }

    /**
     * Company Insights
     */
    @GetMapping("/companies/{companyId}/insights")
    public ResponseEntity<CompanyInsights> getCompanyInsights(
            @PathVariable String companyId) {

        CompanyInsights insights =
                analyticsService.getCompanyInsights(companyId);

        return ResponseEntity.ok(insights);
    }

    /**
     * Alumni Statistics
     */
    @GetMapping("/alumni/statistics")
    public ResponseEntity<AlumniStatistics> getAlumniStatistics() {

        AlumniStatistics statistics =
                analyticsService.getAlumniStatistics();

        return ResponseEntity.ok(statistics);
    }

    /**
     * Recent Placements
     */
    @GetMapping("/placements/recent/{count}")
    public ResponseEntity<List<RecentPlacement>> getRecentPlacements(
            @PathVariable int count) {

        List<RecentPlacement> placements =
                analyticsService.getRecentPlacements(count);

        return ResponseEntity.ok(placements);
    }

    /**
     * Default Recent Placements (10)
     */
    @GetMapping("/placements/recent")
    public ResponseEntity<List<RecentPlacement>> getRecentPlacements() {

        List<RecentPlacement> placements =
                analyticsService.getRecentPlacements(10);

        return ResponseEntity.ok(placements);
    }

    /**
     * Placement Trends
     */
    @GetMapping("/trends")
    public ResponseEntity<PlacementTrends> getPlacementTrends() {

        PlacementTrends trends =
                analyticsService.getPlacementTrends();

        return ResponseEntity.ok(trends);
    }

    /**
     * Top Recommended Resources
     */
    @GetMapping("/resources/recommended/{count}")
    public ResponseEntity<RecommendedResources> getTopRecommendedResources(
            @PathVariable int count) {

        RecommendedResources resources =
                analyticsService.getTopRecommendedResources(count);

        return ResponseEntity.ok(resources);
    }

    /**
     * Default Top Recommended Resources (10)
     */
    @GetMapping("/resources/recommended")
    public ResponseEntity<RecommendedResources> getTopRecommendedResources() {

        RecommendedResources resources =
                analyticsService.getTopRecommendedResources(10);

        return ResponseEntity.ok(resources);
    }
}