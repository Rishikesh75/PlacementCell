namespace PlacementCellBackend.DTOs
{
    public class AlumniStatistics
    {
        public int TotalAlumni { get; set; }
        public int UniqueCompanies { get; set; }
        public List<CompanyAlumniCount> CompanyWiseCount { get; set; } = new();
    }

    public class PositionCount
    {
        public string Position { get; set; } = string.Empty;
        public int Count { get; set; }
    }

    public class CompanyAlumniCount
    {
        public string CompanyId { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public int TotalAlumniCount { get; set; }
        public List<PositionCount> PositionWiseCount { get; set; } = new();
    }
}

