using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models;

public enum PostedByType
{
    Alumni,
    CompanyEmployee
}

public class AlumniJobOpenings
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }

    // College reference (jobs posted for specific college)
    [Required]
    public int CollegeId { get; set; }

    [ForeignKey("CollegeId")]
    public College? College { get; set; }

    [Required]
    public string CompanyId { get; set; } = string.Empty;

    [ForeignKey("CompanyId")]
    public Company? Company { get; set; }

    public string jobtitle { get; set; } = string.Empty;
    public DateOnly postedDate { get; set; }
    public string package { get; set; } = string.Empty;

    [Required]
    public PostedByType postedby { get; set; }

    [Required]
    public string postedbyid { get; set; } = string.Empty;

    public string JobUrl { get; set; } = string.Empty;
    public string postedByProfileUrl { get; set; } = string.Empty;
}
