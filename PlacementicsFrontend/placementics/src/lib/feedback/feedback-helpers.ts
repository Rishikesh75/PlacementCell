import {
  Feedback,
  CompanyDetails,
  CodingRound,
  TechnicalRound,
  HRRound,
  Resource,
  Question,
  DSAQuestion,
  ComputerCoreQuestion,
  SystemDesignQuestion,
  PuzzleBasedQuestion,
  SituationBasedQuestion,
  UnexpectedQuestion,
} from "@/src/lib/domain/entities";

export function createDefaultFeedback(): Feedback {
  return new Feedback(
    new CompanyDetails("", "", 0, "", 6, "", ""),
    new CodingRound("", "", [], "", ""),
    new TechnicalRound("", "", [], [], [], []),
    new HRRound([], []),
    [],
  );
}

export function cloneFeedback(data: Feedback): Feedback {
  const copy = createDefaultFeedback();
  Object.assign(copy.companyDetails, data.companyDetails);
  Object.assign(copy.codingRound, data.codingRound);
  Object.assign(copy.technicalRound, data.technicalRound);
  Object.assign(copy.hrRound, data.hrRound);
  copy.resources = [...data.resources];
  copy.codingRound.codingQuestions = [...data.codingRound.codingQuestions];
  copy.technicalRound.dsaQuestions = [...data.technicalRound.dsaQuestions];
  copy.technicalRound.computerCoreQuestions = [
    ...data.technicalRound.computerCoreQuestions,
  ];
  copy.technicalRound.systemDesignQuestions = [
    ...data.technicalRound.systemDesignQuestions,
  ];
  copy.technicalRound.puzzleBasedQuestions = [
    ...data.technicalRound.puzzleBasedQuestions,
  ];
  copy.hrRound.situationBasedQuestions = [
    ...data.hrRound.situationBasedQuestions,
  ];
  copy.hrRound.unexpectedQuestions = [...data.hrRound.unexpectedQuestions];
  return copy;
}

export function applyGreyBoxData(
  feedback: Feedback,
  boxes: unknown[],
  section: string,
): Feedback {
  const typedBoxes = boxes as Record<string, string>[];

  switch (section) {
    case "CodingQuestion":
      feedback.codingRound.codingQuestions = typedBoxes
        .filter((b) => b.value)
        .map((b) => new Question(b.value));
      break;
    case "DSAQuestions":
      feedback.technicalRound.dsaQuestions = typedBoxes
        .filter((b) => b.Question)
        .map(
          (b) =>
            new DSAQuestion(
              b.Question,
              b.DifficultyLevel || "Medium",
              b.QuestionType || "General",
            ),
        );
      break;
    case "CoreCSQuestions":
      feedback.technicalRound.computerCoreQuestions = typedBoxes
        .filter((b) => b.Question)
        .map(
          (b) =>
            new ComputerCoreQuestion(
              b.Question,
              b.DifficultyLevel || "Medium",
              b.QuestionType || "DBMS",
            ),
        );
      break;
    case "SystemDesign":
      feedback.technicalRound.systemDesignQuestions = typedBoxes
        .filter((b) => b.Question)
        .map(
          (b) =>
            new SystemDesignQuestion(
              b.Question,
              "Medium",
              b.QuestionType || "System Design",
            ),
        );
      break;
    case "PuzzleBasedQuestions":
      feedback.technicalRound.puzzleBasedQuestions = typedBoxes
        .filter((b) => b.Question)
        .map(
          (b) =>
            new PuzzleBasedQuestion(
              b.Question,
              b.DifficultyLevel || "Medium",
            ),
        );
      break;
    case "SituationBasedQuestions":
      feedback.hrRound.situationBasedQuestions = typedBoxes
        .filter((b) => b.Question)
        .map((b) => new SituationBasedQuestion(b.Question));
      break;
    case "UnexpectedQuestions":
      feedback.hrRound.unexpectedQuestions = typedBoxes
        .filter((b) => b.Question)
        .map((b) => new UnexpectedQuestion(b.Question));
      break;
    case "Resources":
      feedback.resources = typedBoxes
        .filter((b) => b.ResourceType || b.Url)
        .map(
          (b) =>
            new Resource(
              b.ResourceType || "",
              b.Description || "",
              b.Url || "",
            ),
        );
      break;
  }

  return feedback;
}
