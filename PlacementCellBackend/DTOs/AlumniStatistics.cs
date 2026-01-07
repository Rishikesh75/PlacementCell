namespace PlacementCellBackend.DTOs
{
    public class AlumniStatistics
    {
        public int TotalAlumni { get; set; }
        public int UniqueCompanies { get; set; }
        public List<PositionCount> TopPositions { get; set; } = new();
        public List<CompanyCount> CompanyWiseCount { get; set; } = new();
    }

    public class PositionCount
    {
        public string Position { get; set; } = string.Empty;
        public int Count { get; set; }
    }

    public class CompanyCount
    {
        public string CompanyName { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}

