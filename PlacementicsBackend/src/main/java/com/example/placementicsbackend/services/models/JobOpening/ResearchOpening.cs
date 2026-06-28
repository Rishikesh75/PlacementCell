using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class ResearchOpening
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = string.Empty;

        // Teacher who posted the research opening
        [Required]
        public string TeacherId { get; set; } = string.Empty;

        [ForeignKey("Id")]
        public Teacher? Teacher { get; set; }

        // Research opening details
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        public string Researcharea { get; set; } = string.Empty;

        public string Stipend { get; set; } = string.Empty;

        public string Duration { get; set; } = string.Empty;

        public DateOnly PostedDate { get; set; }

        public DateOnly? DeadLine { get; set; }

        public string Link { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}

