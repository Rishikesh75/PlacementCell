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
        public Dictionary<string, int> WorkModes { get; set; } = new();
    }

    public class CompanyRanking
    {
        public string CompanyId { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Industry { get; set; } = string.Empty;
        public int TotalHires { get; set; }
        public int Rank { get; set; }
    }
}

