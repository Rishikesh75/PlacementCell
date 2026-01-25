using PlacementCellBackend.Models.Enums;
using PlacementCellBackend.Models.InterviewRounds;

namespace PlacementCellBackend.DTOs;

public class AlumniFeedBackOnCompanyDTO
{
    public string companyName { get; set; } = string.Empty;

    public string AlumniProfile { get; set; } = string.Empty;

    public string jobProfile { get; set; } = string.Empty;

    public string CTC { get; set; } = string.Empty;

    public string JobLocation { get; set; } = string.Empty;

    public JobType JobType { get; set; } = JobType.Internship;

    public WorkMode WorkMode { get; set; } = WorkMode.Remote;

    public CodingRound? CodingRoundInfo { get; set; }

    public TechnicalRound? TechnicalRoundInfo { get; set; }

    public HRRound? HRRoundInfo { get; set; }

    public Resources? ResourcesInfo { get; set; }
}

public class AlumniFeedBackOnCompanyCreateDTO
{
    public string companyid { get; set; } = string.Empty;
    public string alumniid { get; set; } = string.Empty;
    public string jobProfile { get; set; } = string.Empty;
    public string CTC { get; set; } = string.Empty;
    public string JobLocation { get; set; } = string.Empty;
    public JobType JobType { get; set; } = JobType.Internship;
    public WorkMode WorkMode { get; set; } = WorkMode.Remote;
    public CodingRound? CodingRoundInfo { get; set; }
    public TechnicalRound? TechnicalRoundInfo { get; set; }
    public HRRound? HRRoundInfo { get; set; }
    public Resources? ResourcesInfo { get; set; }
}