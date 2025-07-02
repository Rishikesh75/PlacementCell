using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class TeacherPlacements
    {
        [Key]
        public int id { get; set; } // Primary key for this table (optional but recommended)

        [Required]
        public string teacherid { get; set; } = string.Empty;

        [ForeignKey("teacherid")]
        public Teacher? Teacher { get; set; }

        [Required]
        public string companyid { get; set; } = string.Empty;

        [ForeignKey("companyid")]
        public Company? Company { get; set; }

        public string employeeemail { get; set; } = string.Empty;
    }
}
