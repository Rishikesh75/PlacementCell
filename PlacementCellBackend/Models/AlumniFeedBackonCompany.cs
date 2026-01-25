using PlacementCellBackend.Models.Enums;
using PlacementCellBackend.Models.InterviewRounds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlacementCellBackend.Models;

public class AlumniFeedBackonCompany
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int feedbackid { get; set; }

    [Required]
    public string companyid { get; set; } = string.Empty;
    [ForeignKey("companyid")]
    public Company? Company { get; set; }

    [Required]
    public string alumniid { get; set; } = string.Empty;
    [ForeignKey("alumniid")]
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

