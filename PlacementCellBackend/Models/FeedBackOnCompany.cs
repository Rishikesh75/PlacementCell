using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PlacementCellBackend.Models
{
    public class FeedBackOnCompany
    {
        [Key]
        public string feedbackid { get; set; } = string.Empty;
        [Required]
        public string companyid { get; set; } = string.Empty;

        [ForeignKey("companyid")]
        public Company? Company { get; set; }
        [Required]
        public string alumniid { get; set; } = string.Empty;
        [ForeignKey("alumniid")]
        public Alumni? Alumni { get; set; }
        public string description { get; set; } = string.Empty;
    }
}
