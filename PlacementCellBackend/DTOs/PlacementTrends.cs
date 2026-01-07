namespace PlacementCellBackend.DTOs
{
    public class PlacementTrends
    {
        public List<YearlyPlacement> YearlyData { get; set; } = new();
        public List<IndustryDistribution> IndustryBreakdown { get; set; } = new();
        public List<PositionDistribution> TopPositions { get; set; } = new();
    }

    public class YearlyPlacement
    {
        public int Year { get; set; }
        public int PlacementCount { get; set; }
        public int CompaniesVisited { get; set; }
    }

    public class IndustryDistribution
    {
        public string Industry { get; set; } = string.Empty;
        public int Count { get; set; }
        public double Percentage { get; set; }
    }

    public class PositionDistribution
    {
        public string Position { get; set; } = string.Empty;
        public int Count { get; set; }
        public double Percentage { get; set; }
    }
}

