using PlacementCellBackend.Models.Enums;
namespace PlacementCellBackend.Models.InterviewRounds;

public class Resources
{
    public List<LinkResource> Links { get; set; } = new List<LinkResource>();
    public List<BookResource> Books { get; set; } = new List<BookResource>();
}

public class LinkResource
{
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ResourceCategory Category { get; set; } = ResourceCategory.DSA;  
}

public class BookResource
{
    public string BookName { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ISBN { get; set; }
    public string? Publisher { get; set; }
    public ResourceCategory Category { get; set; } = ResourceCategory.DSA;  
}

