namespace PlacementCellBackend.DTOs.ReasearchOpeningsDtos;

public class ResearchOpeningDto
{
    public string Id { get; set; } = string.Empty;

    public string teachername { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Department { get; set; } = string.Empty;

    public string Researcharea { get; set; } = string.Empty;

    public string Stipend { get; set; } = string.Empty;

    public string Duration { get; set; } = string.Empty;

    public DateOnly PostedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    public DateOnly? DeadLine { get; set; } = null;

    public string link { get; set; } = string.Empty;

    public string IsActive { get; set; } = "true";


}

public class ResearchOpeningCreateDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Researcharea { get; set; } = string.Empty;
    public string Stipend { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public DateOnly PostedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    public DateOnly? DeadLine { get; set; } = null;
    public string link { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
