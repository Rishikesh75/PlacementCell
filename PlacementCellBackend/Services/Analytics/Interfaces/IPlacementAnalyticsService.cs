using PlacementCellBackend.DTOs;

namespace PlacementCellBackend.Services.Analytics.Interfaces
{
    public interface IPlacementAnalyticsService
    {
        // Dashboard & Overview
        Task<DashboardStats> GetDashboardStatsAsync();

        // Company Analytics
        Task<IEnumerable<CompanyRanking>> GetTopCompaniesRankingAsync(int topN = 10);
        Task<CompanyInsights> GetCompanyInsightsAsync(string companyId);

        // Alumni Analytics
        Task<AlumniStatistics> GetAlumniStatisticsAsync();
        Task<IEnumerable<RecentPlacement>> GetRecentPlacementsAsync(int count = 10);

        // Placement Trends
        Task<PlacementTrends> GetPlacementTrendsAsync();

        // Resources Analytics
        Task<RecommendedResources> GetTopRecommendedResourcesAsync(int topN = 10);
    }
}

