using PlacementCellBackend.Models.Enums;

namespace PlacementCellBackend.Models.InterviewRounds;

public class TechnicalRound
{
    public InterviewMode InterviewMode { get; set; }

    public string InterviewDuration { get; set; } = string.Empty;

    public List<DSAQuestion> DSAQuestions { get; set; } = new List<DSAQuestion>();

    public List<DBMSQuestion> DBMSQuestions { get; set; } = new List<DBMSQuestion>();

    public List<(string, (string, string))> SystemDesignQuestions { get; set; } = new List<(string, (string, string))>();

    public List<(string, (string, string))> PuzzleBasedQuestions { get; set; } = new List<(string, (string, string))>();
}

public class DSAQuestion
{
    public string QuestionType { get; set; } = string.Empty;
    public DifficultyLevel DifficultyLevel;
    public string Question { get; set; } = string.Empty;
}

public class DBMSQuestion
{
    public string QuestionType { get; set; } = string.Empty;
    public DifficultyLevel DifficultyLevel;
    public string Question { get; set; } = string.Empty;
}

public class SystemDesignQuestion
{
    public string QuestionType { get; set; } = string.Empty;
    public string Question { get; set; }
}

public class PuzzleBasedQuestion
{
    public DifficultyLevel DifficultyLevel;
    public string Question { get; set; }
}


