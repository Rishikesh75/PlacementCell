using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class Teacher
    {
        [Key]
        public string teacher_id { get; set; } = string.Empty;

        // College reference
        [Required]
        public int CollegeId { get; set; }

        [ForeignKey("CollegeId")]
        public College? College { get; set; }

        public string name { get; set; } = string.Empty;
        public string department { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
    }
}
