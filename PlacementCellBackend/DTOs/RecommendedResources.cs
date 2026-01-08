namespace PlacementCellBackend.DTOs
{
    public class RecommendedResources
    {
        public int TotalFeedbacksWithResources { get; set; }
        public List<TopLinkResource> TopLinks { get; set; } = new();
        public List<TopBookResource> TopBooks { get; set; } = new();
    }

    public class TopLinkResource
    {
        public string Title { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int RecommendationCount { get; set; }
    }

    public class TopBookResource
    {
        public string BookName { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int RecommendationCount { get; set; }
    }
}

