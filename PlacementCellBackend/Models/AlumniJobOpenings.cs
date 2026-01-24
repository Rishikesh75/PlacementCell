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
    public int id { get; set; } // Primary key for this table

    [Required]
    public string companyid { get; set; } = string.Empty;

    [ForeignKey("companyid")]
    public Company? Company { get; set; }

    public string jobtitle { get; set; } = string.Empty;

    public DateOnly posteddate { get; set; }

    public string package { get; set; } = string.Empty;

    // Who posted this job position
    [Required]
    public PostedByType postedby { get; set; }

    // Single ID field - references Alumni OR CompanyEmployee based on postedbytype
    [Required]
    public string postedbyid { get; set; } = string.Empty;

    public string JobUrl { get; set; } = string.Empty;

    public string postedByProfileUrl { get; set; } = string.Empty;
}

