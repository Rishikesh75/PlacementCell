using PlacementCellBackend.Models.Enums;

namespace PlacementCellBackend.Models.InterviewRounds;

public class TechnicalRound
{
    public InterviewMode InterviewMode { get; set; }

    public string InterviewDuration { get; set; } = string.Empty;

    public List<DSAQuestion> DSAQuestions { get; set; } = new List<DSAQuestion>();

    public List<CoreCSQuestion> CoreCSQuestions { get; set; } = new List<CoreCSQuestion>();

    public List<SystemDesignQuestion> SystemDesignQuestions { get; set; } = new List<SystemDesignQuestion>();

    public List<PuzzleBasedQuestion> PuzzleBasedQuestions { get; set; } = new List<PuzzleBasedQuestion>();
}

public class DSAQuestion
{
    public DSAQuestionType QuestionType { get; set; } = DSAQuestionType.Others;
    public DifficultyLevel DifficultyLevel;
    public string Question { get; set; } = string.Empty;
}

public class CoreCSQuestion
{
    public CoreCSQuestionType QuestionType { get; set; } = CoreCSQuestionType.Other;
    public DifficultyLevel DifficultyLevel;
    public string Question { get; set; } = string.Empty;
}

public class SystemDesignQuestion
{
    public SystemDesingQuestionType QuestionType { get; set; } = SystemDesingQuestionType.LLD;
    public string Question { get; set; } = string.Empty;
}

public class PuzzleBasedQuestion
{
    public DifficultyLevel DifficultyLevel;
    public string Question { get; set; } = string.Empty;
}


