using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class TeacherPlacement
    {
        [Key]
        public int Id { get; set; } // Primary key for this table (optional but recommended)

        [Required]
        public string TeacherId { get; set; } = string.Empty;

        [ForeignKey("TeacherId")]
        public Teacher? Teacher { get; set; }

        [Required]
        public string CompanyId { get; set; } = string.Empty;

        [ForeignKey("CompanyId")]
        public Company? Company { get; set; }

        public string EmployeeEmail { get; set; } = string.Empty;
    }
}
