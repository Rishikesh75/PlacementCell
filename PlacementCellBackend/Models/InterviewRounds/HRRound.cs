using PlacementCellBackend.Models.Enums;

namespace PlacementCellBackend.Models.InterviewRounds;

public class HRRound
{
    public InterviewMode InterviewMode { get; set; }

    public string InterviewDuration { get; set; } = string.Empty;

    public List<SituationBasedQuestion> SituationBasedQuestions { get; set; } = new List<SituationBasedQuestion>();

    public List<UnExpectedQuestion> UnExpectedQuestions { get; set; } = new List<UnExpectedQuestion>();
}

public class SituationBasedQuestion
{
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
}

public class UnExpectedQuestion
{
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
}