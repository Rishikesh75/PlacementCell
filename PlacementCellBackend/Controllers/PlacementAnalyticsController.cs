using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.DTOs;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacementAnalyticsController : ControllerBase
    {
        private readonly IPlacementAnalyticsService _analyticsService;

        public PlacementAnalyticsController(IPlacementAnalyticsService analyticsService)
        {
            _analyticsService = analyticsService;
        }

        /// <summary>
        /// Get comprehensive dashboard statistics
        /// </summary>
        [HttpGet("dashboard")]
        public async Task<ActionResult<DashboardStats>> GetDashboardStats()
        {
            var stats = await _analyticsService.GetDashboardStatsAsync();
            return Ok(stats);
        }

        /// <summary>
        /// Get top hiring companies ranking
        /// </summary>
        [HttpGet("companies/top/{count:int?}")]
        public async Task<ActionResult<IEnumerable<CompanyRanking>>> GetTopCompanies(int count = 10)
        {
            var rankings = await _analyticsService.GetTopCompaniesRankingAsync(count);
            return Ok(rankings);
        }

        /// <summary>
        /// Get detailed insights for a specific company
        /// </summary>
        [HttpGet("companies/{companyId}/insights")]
        public async Task<ActionResult<CompanyInsights>> GetCompanyInsights(string companyId)
        {
            var insights = await _analyticsService.GetCompanyInsightsAsync(companyId);
            return Ok(insights);
        }

        /// <summary>
        /// Get alumni statistics
        /// </summary>
        [HttpGet("alumni/statistics")]
        public async Task<ActionResult<AlumniStatistics>> GetAlumniStatistics()
        {
            var stats = await _analyticsService.GetAlumniStatisticsAsync();
            return Ok(stats);
        }

        /// <summary>
        /// Get recent placements
        /// </summary>
        [HttpGet("placements/recent/{count:int?}")]
        public async Task<ActionResult<IEnumerable<RecentPlacement>>> GetRecentPlacements(int count = 10)
        {
            var placements = await _analyticsService.GetRecentPlacementsAsync(count);
            return Ok(placements);
        }

        /// <summary>
        /// Get placement trends
        /// </summary>
        [HttpGet("trends")]
        public async Task<ActionResult<PlacementTrends>> GetPlacementTrends()
        {
            var trends = await _analyticsService.GetPlacementTrendsAsync();
            return Ok(trends);
        }

        /// <summary>
        /// Get industry distribution of placements
        /// </summary>
        [HttpGet("industries")]
        public async Task<ActionResult<IEnumerable<IndustryDistribution>>> GetIndustryDistribution()
        {
            var distribution = await _analyticsService.GetIndustryDistributionAsync();
            return Ok(distribution);
        }

        /// <summary>
        /// Get interview insights for a company
        /// </summary>
        [HttpGet("interviews/{companyId}")]
        public async Task<ActionResult<InterviewInsights>> GetInterviewInsights(string companyId)
        {
            var insights = await _analyticsService.GetInterviewInsightsAsync(companyId);
            return Ok(insights);
        }
    }
}

