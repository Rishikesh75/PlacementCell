/**
 * Data Transfer Object for Feedback Form submission
 */
export interface FeedbackFormDTO {
  companydetails: CompanyDetailsDTO;
  codingroundinfo: CodingRoundInfoDTO;
  TechnicalRound: TechnicalRoundDTO;
  HRRound: HRRoundDTO;
  Resources: ResourceDTO[];
}

export interface CompanyDetailsDTO {
  companyName: string;
  jobProfile: string;
  numRounds: number;
  jobType: string;
  ctc: number | string;
  workMode: string;
  location: string;
}

export interface CodingRoundInfoDTO {
  codingPlatform: string;
  codingDuration: string;
  codingQuestions: QuestionDTO[];
  codingDifficulty: string;
  interviewMode: string;
}

export interface TechnicalRoundDTO {
  Interviewmode: string;
  Duration: string;
  DSAQuestion: DSAQuestionDTO[];
  ComputerCoreQuestion: ComputerCoreQuestionDTO[];
  SystemDesignQuestion: SystemDesignQuestionDTO[];
  PuzzleBasedQuestion: PuzzleBasedQuestionDTO[];
}

export interface HRRoundDTO {
  SituationBasedQuestions: QuestionDTO[];
  UnexpectedQuestions: QuestionDTO[];
}

export interface QuestionDTO {
  question: string;
}

export interface BaseQuestionDTO extends QuestionDTO {
  difficulty: string;
}

export interface DSAQuestionDTO extends BaseQuestionDTO {
  questionType: string;
}

export interface ComputerCoreQuestionDTO extends BaseQuestionDTO {
  questionType: string;
}

export interface SystemDesignQuestionDTO extends BaseQuestionDTO {
  questionType: string;
}

export interface PuzzleBasedQuestionDTO extends BaseQuestionDTO {}

export interface ResourceDTO {
  category?: string;
  Description?: string;
  Link?: string;
}

