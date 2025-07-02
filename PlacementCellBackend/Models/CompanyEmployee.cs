using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class Companyemployee
    {
        [Key]
        public string employeeid { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;

        public string designation { get; set; } = string.Empty;

        public string email { get; set; } = string.Empty;

        [Required]
        public string companyid { get; set; } = string.Empty;

        [ForeignKey("companyid")]
        public Company? Company { get; set; }
    }
}
    