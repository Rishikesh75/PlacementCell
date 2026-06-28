package com.example.placementicsbackend.services.analytics.interfaces;

import com.example.placementicsbackend.dtos.AlumniStatistics;
import com.example.placementicsbackend.dtos.CompanyInsights;
import com.example.placementicsbackend.dtos.CompanyRanking;
import com.example.placementicsbackend.dtos.DashboardStats;
import com.example.placementicsbackend.dtos.PlacementTrends;
import com.example.placementicsbackend.dtos.RecentPlacement;
import com.example.placementicsbackend.dtos.RecommendedResources;
import java.util.List;

public interface IPlacementAnalyticsService {

    DashboardStats getDashboardStats();

    List<CompanyRanking> getTopCompaniesRanking(int topN);

    CompanyInsights getCompanyInsights(String companyId);

    AlumniStatistics getAlumniStatistics();

    List<RecentPlacement> getRecentPlacements(int count);

    PlacementTrends getPlacementTrends();

    RecommendedResources getTopRecommendedResources(int topN);
}
