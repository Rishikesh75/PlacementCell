using PlacementCellBackend.Models.Enums;

namespace PlacementCellBackend.Models.InterviewRounds;

public class CodingRound
{
    public CodingPlatform CodingPlatform { get; set; } = CodingPlatform.Other;

    public TimeOnly Duration { get; set; }

    public List<string> Questions { get; set; } = new List<string>();

    public DifficultyLevel DifficultyLevel { get; set; }

    public InterviewMode InterviewMode { get; set; }
}
