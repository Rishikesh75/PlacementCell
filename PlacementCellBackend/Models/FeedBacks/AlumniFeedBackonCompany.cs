using PlacementCellBackend.Models.Enums;
using PlacementCellBackend.Models.InterviewRounds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PlacementCellBackend.Models;

namespace  PlacementCellBackend.Models.FeedBacks;

public class AlumniFeedBackonCompany
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = string.Empty;

    // College reference - feedback is college-specific
    [Required]
    public int CollegeId { get; set; }

    [ForeignKey("CollegeId")]
    public College? College { get; set; }

    [Required]
    public string CompanyId { get; set; } = string.Empty;

    [ForeignKey("CompanyId")]
    public Company? Company { get; set; }

    [Required]
    public string AlumniId { get; set; } = string.Empty;

    [ForeignKey("Id")]
    public Alumni? Alumni { get; set; }

    [Required]
    public string JobProfile { get; set; } = string.Empty;

    [Required]
    public JobType JobType { get; set; }

    [Required]
    public string JobLocation { get; set; } = string.Empty;

    [Required]
    public string CTC { get; set; } = string.Empty;

    [Required]
    public WorkMode WorkMode { get; set; }

    public CodingRound? CodingRoundInfo { get; set; }
    public TechnicalRound? TechnicalRoundInfo { get; set; }
    public HRRound? HRRoundInfo { get; set; }
    public Resources? ResourcesInfo { get; set; }
}
