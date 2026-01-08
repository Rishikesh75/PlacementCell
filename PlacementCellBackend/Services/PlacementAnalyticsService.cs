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
            var recentPlacements = await _context.placement
                .Include(p => p.Student)
                .Include(p => p.Company)
                .OrderByDescending(p => p.placementdate)
                .Take(5)
                .Select(p => new RecentPlacement
                {
                    PlacementId = p.id,
                    StudentId = p.studentid,
                    StudentName = p.Student != null ? p.Student.name : "Unknown",
                    CompanyName = p.Company != null ? p.Company.company_name : "Unknown",
                    JobTitle = p.jobtitle,
                    PlacementDate = p.placementdate,
                    Package = p.package
                })
                .ToListAsync();

            return new DashboardStats
            {
                TotalStudents = await _context.student.CountAsync(),
                TotalAlumni = await _context.alumni.CountAsync(),
                TotalCompanies = await _context.company.CountAsync(),
                TotalFeedbacks = await _context.alumnifeedbackoncompany.CountAsync(),
                ActiveOpenings = await _context.experienceopening.CountAsync(),
                TotalTeachers = await _context.teacher.CountAsync(),
                RecentPlacements = recentPlacements
            };
        }

        /// <summary>
        /// Get top hiring companies ranked by number of placements with yearly breakdown
        /// </summary>
        public async Task<IEnumerable<CompanyRanking>> GetTopCompaniesRankingAsync(int topN = 10)
        {
            var placements = await _context.placement
                .Include(p => p.Company)
                .ToListAsync();

            var companyGroups = placements
                .GroupBy(p => new { p.companyid, CompanyName = p.Company?.company_name ?? "Unknown", Industry = p.Company?.industry ?? "Unknown" })
                .Select(g => new
                {
                    g.Key.companyid,
                    g.Key.CompanyName,
                    g.Key.Industry,
                    TotalPlacements = g.Count(),
                    AveragePackage = g.Any() ? CalculateAveragePackage(g.Select(p => p.package).ToList()) : "N/A",
                    YearlyPlacements = g
                        .GroupBy(p => p.placementdate.Year)
                        .Select(yg => new YearlyPlacementCount
                        {
                            Year = yg.Key,
                            Count = yg.Count()
                        })
                        .OrderByDescending(y => y.Year)
                        .ToList()
                })
                .OrderByDescending(x => x.TotalPlacements)
                .Take(topN)
                .ToList();

            return companyGroups.Select((c, index) => new CompanyRanking
            {
                CompanyId = c.companyid,
                CompanyName = c.CompanyName,
                Industry = c.Industry,
                TotalPlacements = c.TotalPlacements,
                Rank = index + 1,
                AveragePackage = c.AveragePackage,
                YearlyPlacements = c.YearlyPlacements
            });
        }

        /// <summary>
        /// Helper method to calculate average package from list of package strings
        /// </summary>
        private static string CalculateAveragePackage(List<string> packages)
        {
            var validPackages = packages
                .Select(p => ParseSalary(p))
                .Where(p => p > 0)
                .ToList();

            if (!validPackages.Any())
                return "N/A";

            var average = validPackages.Average();
            return $"{average:F2} LPA";
        }

        /// <summary>
        /// Helper method to parse salary/package/CTC string to decimal (in LPA)
        /// Handles formats like "25 LPA", "25L", "2500K", "25 Lakhs", etc.
        /// </summary>
        private static decimal ParseSalary(string salary)
        {
            if (string.IsNullOrWhiteSpace(salary))
                return 0;

            var upper = salary.ToUpper();
            var cleaned = upper
                .Replace("LPA", "")
                .Replace("LAKHS", "")
                .Replace("LAKH", "")
                .Replace("L", "")
                .Replace("K", "")
                .Replace("₹", "")
                .Replace(",", "")
                .Trim();

            if (decimal.TryParse(cleaned, out var value))
            {
                // If original had K (thousands), convert to LPA (divide by 100)
                if (upper.Contains("K") && !upper.Contains("LAKH"))
                {
                    return value / 100;
                }
                // Value is already in LPA/Lakhs
                return value;
            }

            return 0;
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

            var feedbacks = await _context.alumnifeedbackoncompany
                .Where(f => f.companyid == companyId)
                .ToListAsync();

            var alumniCount = await _context.alumni
                .CountAsync(a => a.companyid == companyId);

            var avgCTC = feedbacks.Any()
                ? feedbacks.Average(f => ParseSalary(f.CTC))
                : 0;


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
            };
        }

        /// <summary>
        /// Get alumni statistics including total count and company-wise with position breakdown
        /// </summary>
        public async Task<AlumniStatistics> GetAlumniStatisticsAsync()
        {
            var alumni = await _context.alumni
                .Include(a => a.Company)
                .ToListAsync();

            var companyWise = alumni
                .GroupBy(a => new { a.companyid, CompanyName = a.Company?.company_name ?? "Unknown" })
                .OrderByDescending(g => g.Count())
                .Select(g => new CompanyAlumniCount
                {
                    CompanyId = g.Key.companyid,
                    CompanyName = g.Key.CompanyName,
                    TotalAlumniCount = g.Count(),
                    PositionWiseCount = g
                        .GroupBy(a => a.position)
                        .Where(pg => !string.IsNullOrEmpty(pg.Key))
                        .OrderByDescending(pg => pg.Count())
                        .Select(pg => new PositionCount
                        {
                            Position = pg.Key,
                            Count = pg.Count()
                        })
                        .ToList()
                })
                .ToList();

            return new AlumniStatistics
            {
                TotalAlumni = alumni.Count,
                UniqueCompanies = alumni.Select(a => a.companyid).Distinct().Count(),
                CompanyWiseCount = companyWise
            };
        }

        /// <summary>
        /// Get recent placements for display on dashboard
        /// </summary>
        public async Task<IEnumerable<RecentPlacement>> GetRecentPlacementsAsync(int count = 10)
        {
            return await _context.placement
                .Include(p => p.Student)
                .Include(p => p.Company)
                .OrderByDescending(p => p.placementdate)
                .Take(count)
                .Select(p => new RecentPlacement
                {
                    PlacementId = p.id,
                    StudentId = p.studentid,
                    StudentName = p.Student != null ? p.Student.name : "Unknown",
                    CompanyName = p.Company != null ? p.Company.company_name : "Unknown",
                    JobTitle = p.jobtitle,
                    PlacementDate = p.placementdate,
                    Package = p.package
                })
                .ToListAsync();
        }

        /// <summary>
        /// Get placement trends with yearly and monthly breakdown by position
        /// </summary>
        public async Task<PlacementTrends> GetPlacementTrendsAsync()
        {
            var placements = await _context.placement
                .ToListAsync();

            var totalPlacements = placements.Count;

            // Yearly data with position-wise and monthly breakdown
            var yearlyData = placements
                .GroupBy(p => p.placementdate.Year)
                .OrderByDescending(yg => yg.Key)
                .Select(yg => new YearlyPlacementData
                {
                    Year = yg.Key,
                    TotalPlacements = yg.Count(),
                    UniqueCompanies = yg.Select(p => p.companyid).Distinct().Count(),
                    PositionWiseCount = yg
                        .GroupBy(p => p.jobtitle)
                        .Where(pg => !string.IsNullOrEmpty(pg.Key))
                        .OrderByDescending(pg => pg.Count())
                        .Select(pg => new PositionCount
                        {
                            Position = pg.Key,
                            Count = pg.Count()
                        })
                        .ToList(),
                    MonthlyData = yg
                        .GroupBy(p => p.placementdate.Month)
                        .OrderBy(mg => mg.Key)
                        .Select(mg => new MonthlyPlacementData
                        {
                            Month = mg.Key,
                            MonthName = GetMonthName(mg.Key),
                            PlacementCount = mg.Count(),
                            PositionWiseCount = mg
                                .GroupBy(p => p.jobtitle)
                                .Where(pg => !string.IsNullOrEmpty(pg.Key))
                                .OrderByDescending(pg => pg.Count())
                                .Select(pg => new PositionCount
                                {
                                    Position = pg.Key,
                                    Count = pg.Count()
                                })
                                .ToList()
                        })
                        .ToList()
                })
                .ToList();

            return new PlacementTrends
            {
                TotalPlacements = totalPlacements,
                YearlyData = yearlyData
            };
        }

        /// <summary>
        /// Helper method to get month name from month number
        /// </summary>
        private static string GetMonthName(int month)
        {
            return month switch
            {
                1 => "January",
                2 => "February",
                3 => "March",
                4 => "April",
                5 => "May",
                6 => "June",
                7 => "July",
                8 => "August",
                9 => "September",
                10 => "October",
                11 => "November",
                12 => "December",
                _ => "Unknown"
            };
        }


    }
}

