using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class EmployeeonStudent
    {
        [Key]
        public int RecordId { get; set; } // Primary key for this table
        [Required]
        public string CompnayEmpId { get; set; } = string.Empty;
        [ForeignKey("CompanyEmpId")]
        public CompanyEmployee? CompanyEmployee { get; set; }

        public string BatchId { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
