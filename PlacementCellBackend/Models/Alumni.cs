using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.Design;

namespace PlacementCellBackend.Models
{
    public class Alumni
    {
        [Key]
        public string alumniid { get; set; } = string.Empty;
        public string position { get; set; } = string.Empty;
        public string linkdinprofile { get; set; } = string.Empty;
        [Required]
        public string companyid { get; set; } = string.Empty;
        [ForeignKey("companyid")]
        public Company? Company { get; set; }
    }
}
