using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models;

public class Alumni
{
    [Key]
    public string Id { get; set; } = string.Empty;

    // College reference (which college they graduated from)
    [Required]
    public int CollegeId { get; set; }

    [ForeignKey("CollegeId")]
    public College? College { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string linkdinprofile { get; set; } = string.Empty;

    [Required]
    public string CompanyId { get; set; } = string.Empty;

    [ForeignKey("CompanyId")]
    public Company? Company { get; set; }
}
