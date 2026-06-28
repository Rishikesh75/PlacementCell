using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models;

public abstract class CollegeStaff
{
    [Key]
    public string Id { get; set; } = string.Empty;

    [Required]
    public int CollegeId { get; set; }

    [ForeignKey("CollegeId")]
    public College? College { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class Teacher : CollegeStaff
{
    public string Department { get; set; } = string.Empty;
}

public class PlacementOfficer : CollegeStaff
{
    public string PhoneNo { get; set; } = string.Empty;
}