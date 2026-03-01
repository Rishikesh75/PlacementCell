using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class Placement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        // College reference for direct filtering
        [Required]
        public int CollegeId { get; set; }

        [ForeignKey("CollegeId")]
        public College? College { get; set; }

        [Required]
        public string studentid { get; set; } = string.Empty;

        [ForeignKey("studentid")]
        public Student? Student { get; set; }

        [Required]
        public string companyid { get; set; } = string.Empty;

        [ForeignKey("companyid")]
        public Company? Company { get; set; }

        public string jobtitle { get; set; } = string.Empty;
        public DateOnly placementdate { get; set; }
        public string package { get; set; } = string.Empty;
    }
}
