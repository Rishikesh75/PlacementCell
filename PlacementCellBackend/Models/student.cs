using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class Student
    {
        [Key]
        public string Id { get; set; } = string.Empty;

        // College reference
        [Required]
        public int CollegeId { get; set; }

        [ForeignKey("Id")]
        public College? College { get; set; }

        public string Password { get; set; } = "password123";
        public string Name { get; set; } = string.Empty;
        public string Major { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public long GraduationYear { get; set; }
        public string PhoneNo { get; set; } = string.Empty;
    }
}
