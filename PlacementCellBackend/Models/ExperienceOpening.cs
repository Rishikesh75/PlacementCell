using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class ExperienceOpening
    {
        public int Id { get; set; } = 0;
        [Required]
        public string CompanyId { get; set; } = string.Empty;

        [ForeignKey("CompanyId")]
        public Company? Company { get; set; }
        [Required]
        public string JobID { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string ExperienceRequired { get; set; } = string.Empty;

        public string CompanyEmpEmail { get; set; } = string.Empty;

    }
}
