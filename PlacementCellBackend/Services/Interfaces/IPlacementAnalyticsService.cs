using PlacementCellBackend.DTOs;

namespace PlacementCellBackend.Services.Interfaces
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
        Task<IEnumerable<IndustryDistribution>> GetIndustryDistributionAsync();
        
        // Interview Insights
        Task<InterviewInsights> GetInterviewInsightsAsync(string companyId);
    }
}

