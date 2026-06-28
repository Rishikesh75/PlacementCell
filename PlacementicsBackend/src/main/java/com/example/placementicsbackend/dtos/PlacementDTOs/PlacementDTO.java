namespace PlacementCellBackend.DTOs.PlacementDTOs;

public class PlacementDTO
{
    public string Id { get; set; } = string.Empty;
    public string StudentName { get; set; } = string.Empty;
    public string CompanyId { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public DateOnly PlacementDate { get; set; }
    public string Package { get; set; } = string.Empty;
}

public class CreatePlacementDTO
{
    public string Id { get; set; } = string.Empty;
    public string CompanyId { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public DateOnly PlacementDate { get; set; }
    public string Package { get; set; } = string.Empty;
}
