using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class CompanyEmployee
    {
        [Key]
        public string EmployeeId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        public string Designation { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        [Required]
        public string CompanyId { get; set; } = string.Empty;

        [ForeignKey("CompanyId")]
        public Company? Company { get; set; }
    }
}
    