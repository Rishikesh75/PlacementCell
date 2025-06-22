using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PlacementCellBackend.Models
{
    public class FeedBackOnCompany
    {
        [Key]
        public string FeedbackId { get; set; } = string.Empty;
        [Required]
        public string CompanyId { get; set; } = string.Empty;

        [ForeignKey("CompanyId")]
        public Company? Company { get; set; }
        [Required]
        public string AlumniID { get; set; } = string.Empty;
        [ForeignKey("AlumniID")]
        public Alumni? Alumni { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
