namespace PlacementCellBackend.DTOs
{
    public class InterviewInsights
    {
        public string CompanyId { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public int TotalFeedbacks { get; set; }
        public bool HasCodingRound { get; set; }
        public bool HasTechnicalRound { get; set; }
        public bool HasHRRound { get; set; }
        public List<string> CommonJobProfiles { get; set; } = new();
        public List<string> CommonLocations { get; set; } = new();
        public RoundStatistics RoundStats { get; set; } = new();
    }

    public class RoundStatistics
    {
        public int CodingRoundCount { get; set; }
        public int TechnicalRoundCount { get; set; }
        public int HRRoundCount { get; set; }
    }
}

