using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class Student
    {
        [Key]
        public string studentid { get; set; } = string.Empty;

        // College reference
        [Required]
        public int CollegeId { get; set; }

        [ForeignKey("CollegeId")]
        public College? College { get; set; }

        public string password { get; set; } = "password123";
        public string name { get; set; } = string.Empty;
        public string major { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public long graduationyear { get; set; }
        public string phoneno { get; set; } = string.Empty;
    }
}
