namespace PlacementCellBackend.DTOs
{
    public class CompanyInsights
    {
        public string CompanyId { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Industry { get; set; } = string.Empty;
        public int TotalAlumniPlaced { get; set; }
        public int TotalFeedbacks { get; set; }
        public List<string> JobProfiles { get; set; } = new();
        public List<string> Locations { get; set; } = new();
        public decimal AverageCTC { get; set; }
    }

    public class CompanyRanking
    {
        public string CompanyId { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Industry { get; set; } = string.Empty;
        public int TotalPlacements { get; set; }
        public int Rank { get; set; }
        public string AveragePackage { get; set; } = string.Empty;
        public List<YearlyPlacementCount> YearlyPlacements { get; set; } = new();
    }

    public class YearlyPlacementCount
    {
        public int Year { get; set; }
        public int Count { get; set; }
    }
}

