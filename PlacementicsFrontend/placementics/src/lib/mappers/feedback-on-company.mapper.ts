import type { FeedbackOnCompanyResponseDto } from "@/src/lib/dtos/feedback-on-company-response.dto";
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

function mapJobTypeToEnum(jobType: string): number {
  const jobTypeMap: Record<string, number> = {
    "Full Time": 0,
    FullTime: 0,
    Fte: 0,
    intern: 1,
    Internship: 1,
    "intern+fte": 1,
    Contract: 2,
  };
  return jobTypeMap[jobType] ?? 0;
}

function mapWorkModeToEnum(workMode: string): number {
  const workModeMap: Record<string, number> = {
    Remote: 0,
    WFH: 0,
    Office: 1,
    Onsite: 1,
    Hybrid: 2,
  };
  return workModeMap[workMode] ?? 0;
}

function mapInterviewModeToEnum(interviewMode: string): number {
  const modeMap: Record<string, number> = {
    Online: 0,
    online: 0,
    Offline: 1,
    offline: 1,
    Hybrid: 2,
  };
  return modeMap[interviewMode] ?? 0;
}

function mapDifficultyToEnum(difficulty: string): number {
  const difficultyMap: Record<string, number> = {
    Easy: 0,
    Medium: 1,
    Hard: 2,
    Difficult: 2,
  };
  return difficultyMap[difficulty] ?? 1;
}

function mapInterviewModeFromEnum(mode: number): string {
  const modeMap: Record<number, string> = {
    0: "Online",
    1: "Offline",
    2: "Hybrid",
  };
  return modeMap[mode] ?? "Online";
}

function mapDifficultyFromEnum(difficulty: number): string {
  const difficultyMap: Record<number, string> = {
    0: "Easy",
    1: "Medium",
    2: "Hard",
  };
  return difficultyMap[difficulty] ?? "Medium";
}

function mapJobTypeFromEnum(jobType: number): string {
  const jobTypeMap: Record<number, string> = {
    0: "Full Time",
    1: "Internship",
    2: "Contract",
  };
  return jobTypeMap[jobType] ?? "Full Time";
}

function mapWorkModeFromEnum(workMode: number): string {
  const workModeMap: Record<number, string> = {
    0: "Remote",
    1: "Office",
    2: "Hybrid",
  };
  return workModeMap[workMode] ?? "Office";
}

function mapToCompanyDetails(
  apiResponse: FeedbackOnCompanyResponseDto,
): CompanyDetails {
  let numRounds = 0;
  if (apiResponse.codingRoundInfo) numRounds++;
  if (apiResponse.technicalRoundInfo) numRounds++;
  if (apiResponse.hrRoundInfo) numRounds++;

  return new CompanyDetails(
    apiResponse.company || apiResponse.CompanyId || "Unknown Company",
    apiResponse.jobProfile || "",
    numRounds,
    mapJobTypeFromEnum(apiResponse.jobType),
    apiResponse.ctc || 0,
    mapWorkModeFromEnum(apiResponse.workMode),
    apiResponse.jobLocation || "",
  );
}

function mapToCodingRound(
  apiResponse: FeedbackOnCompanyResponseDto,
): CodingRound {
  const codingInfo = apiResponse.codingRoundInfo;
  if (!codingInfo) {
    return new CodingRound("", "", [], "", "");
  }

  const codingQuestions = (codingInfo.questions || []).map(
    (q: string) => new Question(q),
  );

  return new CodingRound(
    codingInfo.codingPlatform || "",
    codingInfo.Duration || "",
    codingQuestions,
    mapDifficultyFromEnum(codingInfo.difficultyLevel),
    mapInterviewModeFromEnum(codingInfo.interviewMode),
  );
}

function mapToTechnicalRound(
  apiResponse: FeedbackOnCompanyResponseDto,
): TechnicalRound {
  const techInfo = apiResponse.technicalRoundInfo;
  if (!techInfo) {
    return new TechnicalRound("", "", [], [], [], []);
  }

  const dsaQuestions: DSAQuestion[] = (techInfo.dsaQuestions || []).map(
    (q) =>
      new DSAQuestion(q.question, "Medium", q.questionType || "General"),
  );

  const coreCSQuestions: ComputerCoreQuestion[] = (
    techInfo.CoreCSQuestions || []
  ).map(
    (q) =>
      new ComputerCoreQuestion(
        q.question,
        "Medium",
        q.questionType || "DBMS",
      ),
  );

  const systemDesignQuestions: SystemDesignQuestion[] = (
    techInfo.systemDesignQuestions || []
  ).map(
    (q) =>
      new SystemDesignQuestion(
        q.question,
        "Medium",
        q.questionType || "System Design",
      ),
  );

  const puzzleBasedQuestions: PuzzleBasedQuestion[] = (
    techInfo.puzzleBasedQuestions || []
  ).map((q) => new PuzzleBasedQuestion(q.question, "Medium"));

  return new TechnicalRound(
    mapInterviewModeFromEnum(techInfo.interviewMode),
    techInfo.interviewDuration || "",
    dsaQuestions,
    coreCSQuestions,
    systemDesignQuestions,
    puzzleBasedQuestions,
  );
}

function mapToHRRound(apiResponse: FeedbackOnCompanyResponseDto): HRRound {
  const hrInfo = apiResponse.hrRoundInfo;
  if (!hrInfo) {
    return new HRRound([], []);
  }

  const situationBasedQuestions: SituationBasedQuestion[] = (
    hrInfo.situationBasedQuestions || []
  ).map(
    (q) =>
      new SituationBasedQuestion(
        q.answer ? `${q.question} - Answer: ${q.answer}` : q.question,
      ),
  );

  const unexpectedQuestions: UnexpectedQuestion[] = (
    hrInfo.unExpectedQuestions || []
  ).map(
    (q) =>
      new UnexpectedQuestion(
        q.answer ? `${q.question} - Answer: ${q.answer}` : q.question,
      ),
  );

  return new HRRound(situationBasedQuestions, unexpectedQuestions);
}

function mapToResources(
  apiResponse: FeedbackOnCompanyResponseDto,
): Resource[] {
  if (!apiResponse.resourcesInfo?.resourcesList) {
    return [];
  }

  return apiResponse.resourcesInfo.resourcesList.map(
    (r) => new Resource(r.type || "", r.Description || "", r.link || ""),
  );
}

export function mapToFeedbackEntity(
  apiResponse: FeedbackOnCompanyResponseDto,
): Feedback {
  return new Feedback(
    mapToCompanyDetails(apiResponse),
    mapToCodingRound(apiResponse),
    mapToTechnicalRound(apiResponse),
    mapToHRRound(apiResponse),
    mapToResources(apiResponse),
  );
}

export function mapToApiRequest(
  feedback: Feedback,
): FeedbackOnCompanyResponseDto {
  return {
    Id: "fb124",
    CompanyId: feedback.companyDetails.companyName || "comp123",
    company: feedback.companyDetails.companyName || null,
    alumni: null,
    jobProfile: feedback.companyDetails.jobProfile,
    jobType: mapJobTypeToEnum(feedback.companyDetails.jobType),
    jobLocation: feedback.companyDetails.location,
    ctc:
      typeof feedback.companyDetails.ctc === "string"
        ? feedback.companyDetails.ctc
        : feedback.companyDetails.ctc.toString(),
    workMode: mapWorkModeToEnum(feedback.companyDetails.workMode),
    codingRoundInfo: {
      codingPlatform: feedback.codingRound.codingPlatform,
      Duration: feedback.codingRound.codingDuration,
      questions: feedback.codingRound.codingQuestions.map((q) => q.question),
      difficultyLevel: mapDifficultyToEnum(
        feedback.codingRound.codingDifficulty,
      ),
      interviewMode: mapInterviewModeToEnum(feedback.codingRound.interviewMode),
    },
    technicalRoundInfo: {
      interviewMode: mapInterviewModeToEnum(
        feedback.technicalRound.interviewMode,
      ),
      interviewDuration: feedback.technicalRound.Duration,
      dsaQuestions: feedback.technicalRound.dsaQuestions.map((q) => ({
        questionType: q.questionType,
        question: q.question,
      })),
      CoreCSQuestions: feedback.technicalRound.computerCoreQuestions.map(
        (q) => ({
          questionType: q.questionType,
          question: q.question,
        }),
      ),
      systemDesignQuestions: feedback.technicalRound.systemDesignQuestions.map(
        (q) => ({
          questionType: q.questionType,
          question: q.question,
        }),
      ),
      puzzleBasedQuestions: feedback.technicalRound.puzzleBasedQuestions.map(
        (q) => ({
          question: q.question,
        }),
      ),
    },
    hrRoundInfo: {
      interviewMode: 0,
      interviewDuration: "30 minutes",
      situationBasedQuestions: feedback.hrRound.situationBasedQuestions.map(
        (q) => ({
          question: q.question,
          answer: undefined,
        }),
      ),
      unExpectedQuestions: feedback.hrRound.unexpectedQuestions.map((q) => ({
        question: q.question,
        answer: undefined,
      })),
    },
    resourcesInfo: {
      resourcesList: feedback.resources.map((r) => ({
        type: r.category,
        link: r.link,
        Description: r.Description,
      })),
    },
  };
}

export async function getFeedbacks(): Promise<Feedback[]> {
  const { getFeedbacksOnCompany } = await import("@/src/lib/api/feedback-api");
  const responses = await getFeedbacksOnCompany();
  return responses.map(mapToFeedbackEntity);
}

export async function submitFeedbackEntity(
  feedback: Feedback,
): Promise<unknown> {
  const { submitFeedback } = await import("@/src/lib/api/feedback-api");
  return submitFeedback(mapToApiRequest(feedback));
}
