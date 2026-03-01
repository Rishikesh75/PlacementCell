using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models;

public class Alumni
{
    [Key]
    public string alumniid { get; set; } = string.Empty;

    // College reference (which college they graduated from)
    [Required]
    public int CollegeId { get; set; }

    [ForeignKey("CollegeId")]
    public College? College { get; set; }

    public string name { get; set; } = string.Empty;
    public string position { get; set; } = string.Empty;
    public string linkdinprofile { get; set; } = string.Empty;

    [Required]
    public string companyid { get; set; } = string.Empty;

    [ForeignKey("companyid")]
    public Company? Company { get; set; }
}
