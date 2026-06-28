using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models
{
    public class PlacementDrive
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DriveId { get; set; }

        // College reference for multi-tenancy
        [Required]
        public int CollegeId { get; set; }

        [ForeignKey("CollegeId")]
        public College? College { get; set; }

        // Company registering for the drive
        [Required]
        public string CompanyId { get; set; } = string.Empty;

        [ForeignKey("CompanyId")]
        public Company? Company { get; set; }

        [Required]
        [MaxLength(200)]
        public string DriveTitle { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateOnly DriveDate { get; set; }

        public DateOnly RegistrationDeadline { get; set; }

        [MaxLength(500)]
        public string EligibilityCriteria { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Package { get; set; } = string.Empty;

        [MaxLength(200)]
        public string JobRoles { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Location { get; set; } = string.Empty;

        public int? MaxRegistrations { get; set; }

        public int CurrentRegistrations { get; set; } = 0;

        // Status: Scheduled, Open, Ongoing, Completed, Cancelled
        [MaxLength(50)]
        public string Status { get; set; } = "Scheduled";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
