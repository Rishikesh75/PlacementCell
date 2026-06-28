namespace PlacementCellBackend.DTOs
{
    public class PlacementTrends
    {
        public int TotalPlacements { get; set; }
        public List<YearlyPlacementData> YearlyData { get; set; } = new();
    }

    public class YearlyPlacementData
    {
        public int Year { get; set; }
        public int TotalPlacements { get; set; }
        public int UniqueCompanies { get; set; }
        public List<PositionCount> PositionWiseCount { get; set; } = new();
        public List<MonthlyPlacementData> MonthlyData { get; set; } = new();
    }

    public class MonthlyPlacementData
    {
        public int Month { get; set; }
        public string MonthName { get; set; } = string.Empty;
        public int PlacementCount { get; set; }
        public List<PositionCount> PositionWiseCount { get; set; } = new();
    }

    public class PositionDistribution
    {
        public string Position { get; set; } = string.Empty;
        public int Count { get; set; }
        public double Percentage { get; set; }
    }

    public class IndustryDistribution
    {
        public string Industry { get; set; } = string.Empty;
        public int Count { get; set; }
        public double Percentage { get; set; }
    }
}

