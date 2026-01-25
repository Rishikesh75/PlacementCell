namespace PlacementCellBackend.DTOs.ReasearchOpeningsDtos;

public class ResearchOpeningDto
{
    public string teacherid { get; set; } = string.Empty;

    public string teachername { get; set; } = string.Empty;

    public string title { get; set; } = string.Empty;

    public string description { get; set; } = string.Empty;

    public string department { get; set; } = string.Empty;

    public string researcharea { get; set; } = string.Empty;

    public string stipend { get; set; } = string.Empty;

    public string duration { get; set; } = string.Empty;

    public DateOnly posteddate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    public DateOnly? deadline { get; set; } = null;

    public string link { get; set; } = string.Empty;

    public string isactive { get; set; } = "true";


}

public class ResearchOpeningCreateDto
{
    public string teacherid { get; set; } = string.Empty;
    public string title { get; set; } = string.Empty;
    public string description { get; set; } = string.Empty;
    public string department { get; set; } = string.Empty;
    public string researcharea { get; set; } = string.Empty;
    public string stipend { get; set; } = string.Empty;
    public string duration { get; set; } = string.Empty;
    public DateOnly posteddate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    public DateOnly? deadline { get; set; } = null;
    public string link { get; set; } = string.Empty;
    public bool isactive { get; set; } = true;
}
