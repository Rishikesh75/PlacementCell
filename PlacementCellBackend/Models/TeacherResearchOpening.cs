using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class TeacherResearchOpening
    {
        [Key]
        public int id { get; set; }

        // Teacher who posted the research opening
        [Required]
        public string teacherid { get; set; } = string.Empty;

        [ForeignKey("teacherid")]
        public Teacher? Teacher { get; set; }

        // Research opening details
        public string title { get; set; } = string.Empty;

        public string description { get; set; } = string.Empty;

        public string department { get; set; } = string.Empty;

        public string researcharea { get; set; } = string.Empty;

        public string stipend { get; set; } = string.Empty;

        public string duration { get; set; } = string.Empty;

        public DateOnly posteddate { get; set; }

        public DateOnly? deadline { get; set; }

        public bool isactive { get; set; } = true;
    }
}

