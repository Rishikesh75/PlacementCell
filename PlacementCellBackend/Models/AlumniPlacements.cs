using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class AlumniPlacements
    {
        [Key]
        public int id { get; set; } // Primary key for this table

        [Required]
        public string alumniid { get; set; } = string.Empty;

        [ForeignKey("alumniid")]
        public Alumni? Alumni { get; set; }

        [Required]
        public string companyid { get; set; } = string.Empty;

        [ForeignKey("companyid")]
        public Company? Company { get; set; }

        public string jobtitle { get; set; } = string.Empty;

        public DateOnly placementdate { get; set; }

        public string package { get; set; } = string.Empty;
    }
}

