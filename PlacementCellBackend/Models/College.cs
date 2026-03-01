using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class College
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CollegeId { get; set; }

        [Required]
        [MaxLength(200)]
        public string CollegeName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string CollegeCode { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [MaxLength(100)]
        public string State { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string PhoneNo { get; set; } = string.Empty;

        public string? LogoUrl { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime RegisteredOn { get; set; } = DateTime.UtcNow;

        // Navigation properties (college-specific entities only)
        public ICollection<Student> Students { get; set; } = new List<Student>();
        public ICollection<Teacher> Teachers { get; set; } = new List<Teacher>();
        public ICollection<Alumni> Alumni { get; set; } = new List<Alumni>();
        public ICollection<Placement> Placements { get; set; } = new List<Placement>();
        public ICollection<AlumniJobOpenings> JobOpenings { get; set; } = new List<AlumniJobOpenings>();
        public ICollection<AlumniFeedBackonCompany> AlumniFeedbacks { get; set; } = new List<AlumniFeedBackonCompany>();
        public ICollection<EmployeeFeedbackonStudent> EmployeeFeedbacks { get; set; } = new List<EmployeeFeedbackonStudent>();
    }
}
