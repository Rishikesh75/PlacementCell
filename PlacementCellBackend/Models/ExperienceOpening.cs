using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class ExperienceOpening
    {
        public int id { get; set; } = 0;
        [Required]
        public string companyid { get; set; } = string.Empty;

        [ForeignKey("companyid")]
        public Company? Company { get; set; }
        [Required]
        public string jobid { get; set; } = string.Empty;
        public string jobtitle { get; set; } = string.Empty;
        public string experiencerequired { get; set; } = string.Empty;

        public string companyempemail { get; set; } = string.Empty;

    }
}
