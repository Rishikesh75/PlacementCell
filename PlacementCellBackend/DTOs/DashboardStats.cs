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
        public string AlumniId { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string LinkedInProfile { get; set; } = string.Empty;
    }
}

