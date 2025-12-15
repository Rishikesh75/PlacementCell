namespace PlacementCellBackend.Models.InterviewRounds;

public class Resources
{
    public List<ResourceItem> ResourcesList { get; set; } = new List<ResourceItem>();
}

public class ResourceItem
{
    public string Type { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
