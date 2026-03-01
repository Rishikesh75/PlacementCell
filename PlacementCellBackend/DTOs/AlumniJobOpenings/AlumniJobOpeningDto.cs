using PlacementCellBackend.Models;

namespace PlacementCellBackend.DTOs.AlumniJobOpenings;

public class AlumniJobOpeningDto
{
    public string CompanyName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;

    public string postedDate { get; set; } = string.Empty;

    public string package { get; set; } = string.Empty;

    public string JobUrl { get; set; } = string.Empty;

    public string PostedByProfileUrl { get; set; } = string.Empty;
}

public class AlumniJobOpeningCreateDto
{
    public string CompanyId { get; set; } = string.Empty;
    public string Jobtitle { get; set; } = string.Empty;
    public string PostedDate { get; set; } = string.Empty;
    public string Package { get; set; } = string.Empty;
    public string JobUrl { get; set; } = string.Empty;
    public string PostedByProfileUrl { get; set; } = string.Empty;

    public PostedByType? Postedby { get; set; } = null;
    public string Postedbyid { get; set; } = string.Empty;
}



