namespace PlacementCellBackend.DTOs.CompanyEmployee;

public class CompanyEmployeeDto
{
    public string name { get; set; } = string.Empty;

    public string Designation { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string ProfileUrl { get; set; } = string.Empty;

    public string companyname { get; set; } = string.Empty;

}

public class CompanyEmployeeCreateDto
{
    public string id { get; set; } = string.Empty;
    public string name { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string CompanyId { get; set; } = string.Empty;
    public string ProfileUrl { get; set; } = string.Empty;
}
