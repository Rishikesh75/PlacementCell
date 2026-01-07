using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class PlacementAnalyticsService : IPlacementAnalyticsService
    {
        private readonly AppDbContext _context;

        public PlacementAnalyticsService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get comprehensive dashboard statistics for the placement cell
        /// </summary>
        public async Task<DashboardStats> GetDashboardStatsAsync()
        {
            var recentPlacements = await _context.alumni
                .Include(a => a.Company)
                .OrderByDescending(a => a.alumniid)
                .Take(5)
                .Select(a => new RecentPlacement
                {
                    AlumniId = a.alumniid,
                    Position = a.position,
                    CompanyName = a.Company != null ? a.Company.company_name : "Unknown",
                    LinkedInProfile = a.linkdinprofile
                })
                .ToListAsync();

            return new DashboardStats
            {
                TotalStudents = await _context.student.CountAsync(),
                TotalAlumni = await _context.alumni.CountAsync(),
                TotalCompanies = await _context.company.CountAsync(),
                TotalFeedbacks = await _context.feedbackoncompany.CountAsync(),
                ActiveOpenings = await _context.experienceopening.CountAsync(),
                TotalTeachers = await _context.teacher.CountAsync(),
                RecentPlacements = recentPlacements
            };
        }

        /// <summary>
        /// Get top hiring companies ranked by number of alumni placed
        /// </summary>
        public async Task<IEnumerable<CompanyRanking>> GetTopCompaniesRankingAsync(int topN = 10)
        {
            var companyHires = await _context.alumni
                .Include(a => a.Company)
                .GroupBy(a => new { a.companyid, CompanyName = a.Company!.company_name, Industry = a.Company.industry })
                .Select(g => new
                {
                    g.Key.companyid,
                    g.Key.CompanyName,
                    g.Key.Industry,
                    TotalHires = g.Count()
                })
                .OrderByDescending(x => x.TotalHires)
                .Take(topN)
                .ToListAsync();

            return companyHires.Select((c, index) => new CompanyRanking
            {
                CompanyId = c.companyid,
                CompanyName = c.CompanyName,
                Industry = c.Industry,
                TotalHires = c.TotalHires,
                Rank = index + 1
            });
        }

        /// <summary>
        /// Get detailed insights for a specific company
        /// </summary>
        public async Task<CompanyInsights> GetCompanyInsightsAsync(string companyId)
        {
            var company = await _context.company.FindAsync(companyId);
            if (company == null)
            {
                return new CompanyInsights { CompanyId = companyId };
            }

            var feedbacks = await _context.feedbackoncompany
                .Where(f => f.companyid == companyId)
                .ToListAsync();

            var alumniCount = await _context.alumni
                .CountAsync(a => a.companyid == companyId);

            var avgCTC = feedbacks.Any() 
                ? feedbacks.Average(f => ParseCTC(f.CTC)) 
                : 0;

            var workModeDistribution = feedbacks
                .GroupBy(f => f.WorkMode.ToString())
                .ToDictionary(g => g.Key, g => g.Count());

            return new CompanyInsights
            {
                CompanyId = companyId,
                CompanyName = company.company_name,
                Industry = company.industry,
                TotalAlumniPlaced = alumniCount,
                TotalFeedbacks = feedbacks.Count,
                JobProfiles = feedbacks.Select(f => f.JobProfile).Distinct().ToList(),
                Locations = feedbacks.Select(f => f.JobLocation).Distinct().ToList(),
                AverageCTC = avgCTC,
                WorkModes = workModeDistribution
            };
        }

        /// <summary>
        /// Get alumni statistics including top positions and company distribution
        /// </summary>
        public async Task<AlumniStatistics> GetAlumniStatisticsAsync()
        {
            var alumni = await _context.alumni
                .Include(a => a.Company)
                .ToListAsync();

            var topPositions = alumni
                .GroupBy(a => a.position)
                .Where(g => !string.IsNullOrEmpty(g.Key))
                .OrderByDescending(g => g.Count())
                .Take(10)
                .Select(g => new PositionCount
                {
                    Position = g.Key,
                    Count = g.Count()
                })
                .ToList();

            var companyWise = alumni
                .GroupBy(a => a.Company?.company_name ?? "Unknown")
                .OrderByDescending(g => g.Count())
                .Take(10)
                .Select(g => new CompanyCount
                {
                    CompanyName = g.Key,
                    Count = g.Count()
                })
                .ToList();

            return new AlumniStatistics
            {
                TotalAlumni = alumni.Count,
                UniqueCompanies = alumni.Select(a => a.companyid).Distinct().Count(),
                TopPositions = topPositions,
                CompanyWiseCount = companyWise
            };
        }

        /// <summary>
        /// Get recent placements for display on dashboard
        /// </summary>
        public async Task<IEnumerable<RecentPlacement>> GetRecentPlacementsAsync(int count = 10)
        {
            return await _context.alumni
                .Include(a => a.Company)
                .OrderByDescending(a => a.alumniid)
                .Take(count)
                .Select(a => new RecentPlacement
                {
                    AlumniId = a.alumniid,
                    Position = a.position,
                    CompanyName = a.Company != null ? a.Company.company_name : "Unknown",
                    LinkedInProfile = a.linkdinprofile
                })
                .ToListAsync();
        }

        /// <summary>
        /// Get placement trends including industry and position distribution
        /// </summary>
        public async Task<PlacementTrends> GetPlacementTrendsAsync()
        {
            var alumni = await _context.alumni
                .Include(a => a.Company)
                .ToListAsync();

            var totalAlumni = alumni.Count;

            // Industry distribution
            var industryBreakdown = alumni
                .GroupBy(a => a.Company?.industry ?? "Unknown")
                .Select(g => new IndustryDistribution
                {
                    Industry = g.Key,
                    Count = g.Count(),
                    Percentage = totalAlumni > 0 ? Math.Round((double)g.Count() / totalAlumni * 100, 2) : 0
                })
                .OrderByDescending(x => x.Count)
                .ToList();

            // Position distribution
            var topPositions = alumni
                .GroupBy(a => a.position)
                .Where(g => !string.IsNullOrEmpty(g.Key))
                .Select(g => new PositionDistribution
                {
                    Position = g.Key,
                    Count = g.Count(),
                    Percentage = totalAlumni > 0 ? Math.Round((double)g.Count() / totalAlumni * 100, 2) : 0
                })
                .OrderByDescending(x => x.Count)
                .Take(10)
                .ToList();

            return new PlacementTrends
            {
                YearlyData = new List<YearlyPlacement>(), // Can be populated if you add year field to alumni
                IndustryBreakdown = industryBreakdown,
                TopPositions = topPositions
            };
        }

        /// <summary>
        /// Get industry-wise distribution of placements
        /// </summary>
        public async Task<IEnumerable<IndustryDistribution>> GetIndustryDistributionAsync()
        {
            var alumni = await _context.alumni
                .Include(a => a.Company)
                .ToListAsync();

            var totalAlumni = alumni.Count;

            return alumni
                .GroupBy(a => a.Company?.industry ?? "Unknown")
                .Select(g => new IndustryDistribution
                {
                    Industry = g.Key,
                    Count = g.Count(),
                    Percentage = totalAlumni > 0 ? Math.Round((double)g.Count() / totalAlumni * 100, 2) : 0
                })
                .OrderByDescending(x => x.Count)
                .ToList();
        }

        /// <summary>
        /// Get interview insights for a specific company
        /// </summary>
        public async Task<InterviewInsights> GetInterviewInsightsAsync(string companyId)
        {
            var company = await _context.company.FindAsync(companyId);
            var feedbacks = await _context.feedbackoncompany
                .Where(f => f.companyid == companyId)
                .ToListAsync();

            var codingRoundCount = feedbacks.Count(f => f.CodingRoundInfo != null);
            var technicalRoundCount = feedbacks.Count(f => f.TechnicalRoundInfo != null);
            var hrRoundCount = feedbacks.Count(f => f.HRRoundInfo != null);

            return new InterviewInsights
            {
                CompanyId = companyId,
                CompanyName = company?.company_name ?? "Unknown",
                TotalFeedbacks = feedbacks.Count,
                HasCodingRound = codingRoundCount > 0,
                HasTechnicalRound = technicalRoundCount > 0,
                HasHRRound = hrRoundCount > 0,
                CommonJobProfiles = feedbacks
                    .Select(f => f.JobProfile)
                    .Distinct()
                    .ToList(),
                CommonLocations = feedbacks
                    .Select(f => f.JobLocation)
                    .Distinct()
                    .ToList(),
                RoundStats = new RoundStatistics
                {
                    CodingRoundCount = codingRoundCount,
                    TechnicalRoundCount = technicalRoundCount,
                    HRRoundCount = hrRoundCount
                }
            };
        }

        /// <summary>
        /// Helper method to parse CTC string to decimal
        /// </summary>
        private static decimal ParseCTC(string ctc)
        {
            if (string.IsNullOrWhiteSpace(ctc))
                return 0;

            // Remove common suffixes like "LPA", "K", etc.
            var cleaned = ctc.ToUpper()
                .Replace("LPA", "")
                .Replace("LAKHS", "")
                .Replace("L", "")
                .Replace("K", "")
                .Replace("₹", "")
                .Replace(",", "")
                .Trim();

            if (decimal.TryParse(cleaned, out var value))
            {
                // If original had LPA/L, multiply by 100000
                if (ctc.ToUpper().Contains("LPA") || ctc.ToUpper().Contains("LAKH") || 
                    (ctc.ToUpper().Contains("L") && !ctc.ToUpper().Contains("K")))
                {
                    return value * 100000;
                }
                // If original had K, multiply by 1000
                if (ctc.ToUpper().Contains("K"))
                {
                    return value * 1000;
                }
                return value;
            }

            return 0;
        }
    }
}

