using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models;

public class EmployeeFeedbackonStudent
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }

    // College reference - feedback is college-specific
    [Required]
    public int CollegeId { get; set; }

    [ForeignKey("CollegeId")]
    public College? College { get; set; }

    [Required]
    public string CompanyEmpId { get; set; } = string.Empty;

    [ForeignKey("CompanyEmpId")]
    public Companyemployee? CompanyEmployee { get; set; }

    public string BatchId { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
