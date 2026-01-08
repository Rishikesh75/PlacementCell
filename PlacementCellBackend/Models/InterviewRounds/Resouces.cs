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
    public string Category { get; set; } = string.Empty;  // e.g., "DSA", "System Design", "Interview Prep"
}

public class BookResource
{
    public string BookName { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ISBN { get; set; }
    public string? Publisher { get; set; }
    public string Category { get; set; } = string.Empty;  // e.g., "DSA", "System Design"
}

// Legacy class - kept for backward compatibility with existing migrations
[Obsolete("Use LinkResource or BookResource instead")]
public class ResourceItem
{
    public string Type { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
