using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public enum PostedByType
    {
        Alumni,
        CompanyEmployee
    }

    public class AlumniJobPosition
    {
        [Key]
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
        public PostedByType postedbytype { get; set; }

        // Alumni who posted (nullable - only set if postedbytype is Alumni)
        public string? postedbyalumniid { get; set; }

        [ForeignKey("postedbyalumniid")]
        public Alumni? PostedByAlumni { get; set; }

        // Company Employee who posted (nullable - only set if postedbytype is CompanyEmployee)
        public string? postedbyemployeeid { get; set; }

        [ForeignKey("postedbyemployeeid")]
        public Companyemployee? PostedByEmployee { get; set; }
    }
}
