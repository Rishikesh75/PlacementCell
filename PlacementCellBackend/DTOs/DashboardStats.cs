using PlacementCellBackend.Models;

namespace PlacementCellBackend.DTOs
{
    public class DashboardStats
    {
        public int TotalStudents { get; set; }
        public int TotalAlumni { get; set; }
        public int TotalCompanies { get; set; }
        public int TotalFeedbacks { get; set; }
        public int ActiveOpenings { get; set; }
        public int TotalTeachers { get; set; }
        public List<RecentPlacement> RecentPlacements { get; set; } = new();
    }

    public class RecentPlacement
    {
        public int PlacementId { get; set; }
        public string StudentId { get; set; } = string.Empty;
        public string StudentName { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public DateOnly PlacementDate { get; set; }
        public string Package { get; set; } = string.Empty;
    }
}

