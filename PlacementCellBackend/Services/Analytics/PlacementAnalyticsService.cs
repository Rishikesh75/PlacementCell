using Microsoft.EntityFrameworkCore;
using Npgsql;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs;
using PlacementCellBackend.Helpers;
using PlacementCellBackend.Services.Analytics.Interfaces;
using System.Data;

namespace PlacementCellBackend.Services.Analytics
{
    /// <summary>
    /// Analytics service that executes SQL queries for multi-table analytics.
    /// SQL queries are loaded from external files in the SQL/Queries folder.
    /// No stored procedures required - all query logic is in the application.
    /// </summary>
    public class PlacementAnalyticsService : IPlacementAnalyticsService
    {
        private readonly AppDbContext _context;

        public PlacementAnalyticsService(AppDbContext context)
        {
            _context = context;
        }

        #region SQL Query Loaders

        /// <summary>
        /// Static class containing SQL queries loaded from files.
        /// Queries are organized by category (folder) and cached for performance.
        /// </summary>
        private static class Queries
        {
            // Dashboard Queries
            public static string GetDashboardStats => SqlQueryLoader.LoadQuery("Dashboard", "GetDashboardStats");
            public static string GetRecentPlacements => SqlQueryLoader.LoadQuery("Dashboard", "GetRecentPlacements");

            // Company Queries
            public static string GetTopCompaniesRanking => SqlQueryLoader.LoadQuery("Companies", "GetTopCompaniesRanking");
            public static string GetCompanyYearlyPlacements => SqlQueryLoader.LoadQuery("Companies", "GetCompanyYearlyPlacements");
            public static string GetCompanyInsights => SqlQueryLoader.LoadQuery("Companies", "GetCompanyInsights");

            // Alumni Queries
            public static string GetAlumniStatistics => SqlQueryLoader.LoadQuery("Alumni", "GetAlumniStatistics");
            public static string GetAlumniByCompany => SqlQueryLoader.LoadQuery("Alumni", "GetAlumniByCompany");
            public static string GetPositionsByCompany => SqlQueryLoader.LoadQuery("Alumni", "GetPositionsByCompany");

            // Placement Queries
            public static string GetPlacementTrendsSummary => SqlQueryLoader.LoadQuery("Placements", "GetPlacementTrendsSummary");
            public static string GetYearlyPlacementData => SqlQueryLoader.LoadQuery("Placements", "GetYearlyPlacementData");
            public static string GetPositionsByYear => SqlQueryLoader.LoadQuery("Placements", "GetPositionsByYear");
            public static string GetMonthlyPlacementData => SqlQueryLoader.LoadQuery("Placements", "GetMonthlyPlacementData");
            public static string GetPositionsByYearMonth => SqlQueryLoader.LoadQuery("Placements", "GetPositionsByYearMonth");
        }

        #endregion

        /// <summary>
        /// Get comprehensive dashboard statistics for the placement cell
        /// </summary>
        public async Task<DashboardStats> GetDashboardStatsAsync()
        {
            var connection = _context.Database.GetDbConnection();
            await connection.OpenAsync();

            try
            {
                var stats = new DashboardStats();

                // Get counts from SQL query (no parameters needed)
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = Queries.GetDashboardStats;

                    using var reader = await command.ExecuteReaderAsync();
                    if (await reader.ReadAsync())
                    {
                        stats.TotalStudents = reader.GetInt32(reader.GetOrdinal("total_students"));
                        stats.TotalAlumni = reader.GetInt32(reader.GetOrdinal("total_alumni"));
                        stats.TotalCompanies = reader.GetInt32(reader.GetOrdinal("total_companies"));
                        stats.TotalFeedbacks = reader.GetInt32(reader.GetOrdinal("total_feedbacks"));
                        stats.ActiveOpenings = reader.GetInt32(reader.GetOrdinal("active_openings"));
                        stats.TotalTeachers = reader.GetInt32(reader.GetOrdinal("total_teachers"));
                    }
                }

                // Get recent placements from SQL query
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = Queries.GetRecentPlacements;
                    command.Parameters.Add(new NpgsqlParameter("p_count", 5));

                    using var reader = await command.ExecuteReaderAsync();
                    var recentPlacements = new List<RecentPlacement>();

                    while (await reader.ReadAsync())
                    {
                        recentPlacements.Add(new RecentPlacement
                        {
                            PlacementId = reader.GetInt32(reader.GetOrdinal("placement_id")),
                            StudentId = reader.GetString(reader.GetOrdinal("student_id")),
                            StudentName = reader.GetString(reader.GetOrdinal("student_name")),
                            CompanyName = reader.GetString(reader.GetOrdinal("company_name")),
                            JobTitle = reader.GetString(reader.GetOrdinal("job_title")),
                            PlacementDate = DateOnly.FromDateTime(reader.GetDateTime(reader.GetOrdinal("placement_date"))),
                            Package = reader.GetString(reader.GetOrdinal("package"))
                        });
                    }

                    stats.RecentPlacements = recentPlacements;
                }

                return stats;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        /// <summary>
        /// Get top hiring companies ranked by number of placements with yearly breakdown
        /// </summary>
        public async Task<IEnumerable<CompanyRanking>> GetTopCompaniesRankingAsync(int topN = 10)
        {
            var connection = _context.Database.GetDbConnection();
            await connection.OpenAsync();

            try
            {
                var rankings = new List<CompanyRanking>();

                // Get company rankings from SQL query
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = Queries.GetTopCompaniesRanking;
                    command.Parameters.Add(new NpgsqlParameter("p_top_n", topN));

                    using var reader = await command.ExecuteReaderAsync();
                    while (await reader.ReadAsync())
                    {
                        var companyId = reader.GetString(reader.GetOrdinal("company_id"));
                        var avgPackage = reader.IsDBNull(reader.GetOrdinal("average_package"))
                            ? 0m
                            : reader.GetDecimal(reader.GetOrdinal("average_package"));

                        rankings.Add(new CompanyRanking
                        {
                            CompanyId = companyId,
                            CompanyName = reader.GetString(reader.GetOrdinal("company_name")),
                            Industry = reader.GetString(reader.GetOrdinal("industry")),
                            TotalPlacements = reader.GetInt32(reader.GetOrdinal("total_placements")),
                            Rank = reader.GetInt32(reader.GetOrdinal("rank")),
                            AveragePackage = avgPackage > 0 ? $"{avgPackage:F2} LPA" : "N/A",
                            YearlyPlacements = new List<YearlyPlacementCount>()
                        });
                    }
                }

                // Get yearly placements for each company
                foreach (var ranking in rankings)
                {
                    using var command = connection.CreateCommand();
                    command.CommandText = Queries.GetCompanyYearlyPlacements;
                    command.Parameters.Add(new NpgsqlParameter("p_company_id", ranking.CompanyId));

                    using var reader = await command.ExecuteReaderAsync();
                    var yearlyPlacements = new List<YearlyPlacementCount>();

                    while (await reader.ReadAsync())
                    {
                        yearlyPlacements.Add(new YearlyPlacementCount
                        {
                            Year = reader.GetInt32(reader.GetOrdinal("year")),
                            Count = reader.GetInt32(reader.GetOrdinal("placement_count"))
                        });
                    }

                    ranking.YearlyPlacements = yearlyPlacements;
                }

                return rankings;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        /// <summary>
        /// Get detailed insights for a specific company
        /// </summary>
        public async Task<CompanyInsights> GetCompanyInsightsAsync(string companyId)
        {
            var connection = _context.Database.GetDbConnection();
            await connection.OpenAsync();

            try
            {
                using var command = connection.CreateCommand();
                command.CommandText = Queries.GetCompanyInsights;
                command.Parameters.Add(new NpgsqlParameter("p_company_id", companyId));

                using var reader = await command.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    var jobProfilesArray = reader.IsDBNull(reader.GetOrdinal("job_profiles"))
                        ? Array.Empty<string>()
                        : (string[])reader.GetValue(reader.GetOrdinal("job_profiles"));

                    var locationsArray = reader.IsDBNull(reader.GetOrdinal("locations"))
                        ? Array.Empty<string>()
                        : (string[])reader.GetValue(reader.GetOrdinal("locations"));

                    return new CompanyInsights
                    {
                        CompanyId = reader.GetString(reader.GetOrdinal("company_id")),
                        CompanyName = reader.GetString(reader.GetOrdinal("company_name")),
                        Industry = reader.GetString(reader.GetOrdinal("industry")),
                        TotalAlumniPlaced = reader.GetInt32(reader.GetOrdinal("total_alumni_placed")),
                        TotalFeedbacks = reader.GetInt32(reader.GetOrdinal("total_feedbacks")),
                        AverageCTC = reader.IsDBNull(reader.GetOrdinal("average_ctc"))
                            ? 0m
                            : reader.GetDecimal(reader.GetOrdinal("average_ctc")),
                        JobProfiles = jobProfilesArray.ToList(),
                        Locations = locationsArray.ToList()
                    };
                }

                return new CompanyInsights { CompanyId = companyId };
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        /// <summary>
        /// Get alumni statistics including total count and company-wise with position breakdown
        /// </summary>
        public async Task<AlumniStatistics> GetAlumniStatisticsAsync()
        {
            var connection = _context.Database.GetDbConnection();
            await connection.OpenAsync();

            try
            {
                var stats = new AlumniStatistics();

                // Get overall statistics (no parameters needed)
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = Queries.GetAlumniStatistics;

                    using var reader = await command.ExecuteReaderAsync();
                    if (await reader.ReadAsync())
                    {
                        stats.TotalAlumni = reader.GetInt32(reader.GetOrdinal("total_alumni"));
                        stats.UniqueCompanies = reader.GetInt32(reader.GetOrdinal("unique_companies"));
                    }
                }

                // Get company-wise alumni count (no parameters needed)
                var companyWiseList = new List<CompanyAlumniCount>();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = Queries.GetAlumniByCompany;

                    using var reader = await command.ExecuteReaderAsync();
                    while (await reader.ReadAsync())
                    {
                        companyWiseList.Add(new CompanyAlumniCount
                        {
                            CompanyId = reader.GetString(reader.GetOrdinal("company_id")),
                            CompanyName = reader.GetString(reader.GetOrdinal("company_name")),
                            TotalAlumniCount = reader.GetInt32(reader.GetOrdinal("total_alumni_count")),
                            PositionWiseCount = new List<PositionCount>()
                        });
                    }
                }

                // Get position-wise count for each company
                foreach (var company in companyWiseList)
                {
                    using var command = connection.CreateCommand();
                    command.CommandText = Queries.GetPositionsByCompany;
                    command.Parameters.Add(new NpgsqlParameter("p_company_id", company.CompanyId));

                    using var reader = await command.ExecuteReaderAsync();
                    var positions = new List<PositionCount>();

                    while (await reader.ReadAsync())
                    {
                        positions.Add(new PositionCount
                        {
                            Position = reader.GetString(reader.GetOrdinal("position_name")),
                            Count = reader.GetInt32(reader.GetOrdinal("total_count"))
                        });
                    }

                    company.PositionWiseCount = positions;
                }

                stats.CompanyWiseCount = companyWiseList;
                return stats;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        /// <summary>
        /// Get recent placements for display on dashboard
        /// </summary>
        public async Task<IEnumerable<RecentPlacement>> GetRecentPlacementsAsync(int count = 10)
        {
            var connection = _context.Database.GetDbConnection();
            await connection.OpenAsync();

            try
            {
                var placements = new List<RecentPlacement>();

                using var command = connection.CreateCommand();
                command.CommandText = Queries.GetRecentPlacements;
                command.Parameters.Add(new NpgsqlParameter("p_count", count));

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    placements.Add(new RecentPlacement
                    {
                        PlacementId = reader.GetInt32(reader.GetOrdinal("placement_id")),
                        StudentId = reader.GetString(reader.GetOrdinal("student_id")),
                        StudentName = reader.GetString(reader.GetOrdinal("student_name")),
                        CompanyName = reader.GetString(reader.GetOrdinal("company_name")),
                        JobTitle = reader.GetString(reader.GetOrdinal("job_title")),
                        PlacementDate = DateOnly.FromDateTime(reader.GetDateTime(reader.GetOrdinal("placement_date"))),
                        Package = reader.GetString(reader.GetOrdinal("package"))
                    });
                }

                return placements;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        /// <summary>
        /// Get placement trends with yearly and monthly breakdown by position
        /// </summary>
        public async Task<PlacementTrends> GetPlacementTrendsAsync()
        {
            var connection = _context.Database.GetDbConnection();
            await connection.OpenAsync();

            try
            {
                var trends = new PlacementTrends();

                // Get total placements (no parameters needed)
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = Queries.GetPlacementTrendsSummary;

                    using var reader = await command.ExecuteReaderAsync();
                    if (await reader.ReadAsync())
                    {
                        trends.TotalPlacements = reader.GetInt32(reader.GetOrdinal("total_placements"));
                    }
                }

                // Get yearly data (no parameters needed)
                var yearlyData = new List<YearlyPlacementData>();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = Queries.GetYearlyPlacementData;

                    using var reader = await command.ExecuteReaderAsync();
                    while (await reader.ReadAsync())
                    {
                        yearlyData.Add(new YearlyPlacementData
                        {
                            Year = reader.GetInt32(reader.GetOrdinal("year")),
                            TotalPlacements = reader.GetInt32(reader.GetOrdinal("total_placements")),
                            UniqueCompanies = reader.GetInt32(reader.GetOrdinal("unique_companies")),
                            PositionWiseCount = new List<PositionCount>(),
                            MonthlyData = new List<MonthlyPlacementData>()
                        });
                    }
                }

                // Get position-wise count and monthly data for each year
                foreach (var year in yearlyData)
                {
                    // Get positions for this year
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = Queries.GetPositionsByYear;
                        command.Parameters.Add(new NpgsqlParameter("p_year", year.Year));

                        using var reader = await command.ExecuteReaderAsync();
                        var positions = new List<PositionCount>();

                        while (await reader.ReadAsync())
                        {
                            positions.Add(new PositionCount
                            {
                                Position = reader.GetString(reader.GetOrdinal("position_name")),
                                Count = reader.GetInt32(reader.GetOrdinal("total_count"))
                            });
                        }

                        year.PositionWiseCount = positions;
                    }

                    // Get monthly data for this year
                    var monthlyData = new List<MonthlyPlacementData>();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = Queries.GetMonthlyPlacementData;
                        command.Parameters.Add(new NpgsqlParameter("p_year", year.Year));

                        using var reader = await command.ExecuteReaderAsync();
                        while (await reader.ReadAsync())
                        {
                            monthlyData.Add(new MonthlyPlacementData
                            {
                                Month = reader.GetInt32(reader.GetOrdinal("month")),
                                MonthName = reader.GetString(reader.GetOrdinal("month_name")).Trim(),
                                PlacementCount = reader.GetInt32(reader.GetOrdinal("placement_count")),
                                PositionWiseCount = new List<PositionCount>()
                            });
                        }
                    }

                    // Get position-wise count for each month
                    foreach (var month in monthlyData)
                    {
                        using var command = connection.CreateCommand();
                        command.CommandText = Queries.GetPositionsByYearMonth;
                        command.Parameters.Add(new NpgsqlParameter("p_year", year.Year));
                        command.Parameters.Add(new NpgsqlParameter("p_month", month.Month));

                        using var reader = await command.ExecuteReaderAsync();
                        var positions = new List<PositionCount>();

                        while (await reader.ReadAsync())
                        {
                            positions.Add(new PositionCount
                            {
                                Position = reader.GetString(reader.GetOrdinal("position_name")),
                                Count = reader.GetInt32(reader.GetOrdinal("total_count"))
                            });
                        }

                        month.PositionWiseCount = positions;
                    }

                    year.MonthlyData = monthlyData;
                }

                trends.YearlyData = yearlyData;
                return trends;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        /// <summary>
        /// Get top recommended resources (Books and Links) based on count from alumni feedback
        /// Note: This uses Entity Framework as it involves complex JSONB parsing
        /// </summary>
        public async Task<RecommendedResources> GetTopRecommendedResourcesAsync(int topN = 10)
        {
            // For JSONB operations with complex nested structures, EF Core is more suitable
            var feedbacks = await _context.alumnifeedbackoncompany
                .Where(f => f.ResourcesInfo != null)
                .ToListAsync();

            var feedbacksWithResources = feedbacks
                .Where(f => f.ResourcesInfo != null &&
                           (f.ResourcesInfo.Links.Any() || f.ResourcesInfo.Books.Any()))
                .ToList();

            // Aggregate all links and count by URL (unique identifier)
            var allLinks = feedbacksWithResources
                .Where(f => f.ResourcesInfo?.Links != null)
                .SelectMany(f => f.ResourcesInfo!.Links)
                .GroupBy(l => l.Url.ToLower())
                .Select(g => new TopLinkResource
                {
                    Title = g.First().Title,
                    Url = g.First().Url,
                    Description = g.First().Description,
                    Category = g.First().Category,
                    RecommendationCount = g.Count()
                })
                .OrderByDescending(l => l.RecommendationCount)
                .Take(topN)
                .ToList();

            // Aggregate all books and count by BookName + Author (unique identifier)
            var allBooks = feedbacksWithResources
                .Where(f => f.ResourcesInfo?.Books != null)
                .SelectMany(f => f.ResourcesInfo!.Books)
                .GroupBy(b => $"{b.BookName.ToLower()}|{b.Author.ToLower()}")
                .Select(g => new TopBookResource
                {
                    BookName = g.First().BookName,
                    Author = g.First().Author,
                    Description = g.First().Description,
                    Category = g.First().Category,
                    RecommendationCount = g.Count()
                })
                .OrderByDescending(b => b.RecommendationCount)
                .Take(topN)
                .ToList();

            return new RecommendedResources
            {
                TotalFeedbacksWithResources = feedbacksWithResources.Count,
                TopLinks = allLinks,
                TopBooks = allBooks
            };
        }
    }
}
