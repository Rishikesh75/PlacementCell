using PlacementCellBackend.Models.Enums;

namespace PlacementCellBackend.Models.InterviewRounds;

public class CodingRound
{
    public string CodingPlatform { get; set; } = string.Empty;

    public TimeOnly Duration { get; set; }

    public List<string> Questions { get; set; } = new List<string>();

    public DifficultyLevel DifficultyLevel { get; set; }

    public InterviewMode InterviewMode { get; set; }
}
