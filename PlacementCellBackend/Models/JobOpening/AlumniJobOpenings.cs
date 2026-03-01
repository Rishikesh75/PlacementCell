using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PlacementCellBackend.Models.Enums;

namespace PlacementCellBackend.Models;

public class AlumniJobOpenings
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = string.Empty;

    // College reference (jobs posted for specific college)
    [Required]
    public int CollegeId { get; set; }

    [ForeignKey("CollegeId")]
    public College? College { get; set; }

    [Required]
    public string CompanyId { get; set; } = string.Empty;

    [ForeignKey("CompanyId")]
    public Company? Company { get; set; }

    public string JobTitle { get; set; } = string.Empty;
    public DateOnly PostedDate { get; set; }
    public string Package { get; set; } = string.Empty;

    [Required]
    public PostedByType PostedBy { get; set; }

    [Required]
    public string PostedId { get; set; } = string.Empty;

    public string JobUrl { get; set; } = string.Empty;
    public string PostedByProfileUrl { get; set; } = string.Empty;
}
