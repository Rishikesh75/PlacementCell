using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.Design;

namespace PlacementCellBackend.Models
{
    public class Alumni
    {
        [Key]
        public string AlumniId { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string LinkdinProfile { get; set; } = string.Empty;
        [Required]
        public string CompanyId { get; set; } = string.Empty;
        [ForeignKey("CompanyId")]
        public Company? Company { get; set; }
    }
}
