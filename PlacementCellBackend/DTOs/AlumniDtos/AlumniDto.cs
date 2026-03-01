namespace PlacementCellBackend.DTOs.AlumniDtos;

public class AlumniDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string LinkedInProfile { get; set; } = string.Empty;
    public string CompanyId { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
}

public class AlumniDtoCreate
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string LinkedInProfile { get; set; } = string.Empty;
    public string CompanyId { get; set; } = string.Empty;
}

public class AlumniDtoUpDate
{
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string LinkedInProfile { get; set; } = string.Empty;
    public string CompanyId { get; set; } = string.Empty;
}

