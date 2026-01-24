using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models;

public class EmployeeFeedbackonStudent
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int RecordId { get; set; } // Primary key for this table
    [Required]
    public string CompanyEmpId { get; set; } = string.Empty;
    [ForeignKey("CompanyEmpId")]
    public Companyemployee? CompanyEmployee { get; set; }

    public string BatchId { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

