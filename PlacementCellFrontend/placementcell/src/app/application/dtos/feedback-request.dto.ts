/**
 * Feedback Request DTO
 * Data Transfer Object for submitting feedback to the API
 */

export interface FeedbackRequestDto {
  companydetails: CompanyDetailsDto;
  codingroundinfo: CodingRoundInfoDto;
  TechnicalRound: TechnicalRoundDto;
  HRRound: HRRoundDto;
  Resources: ResourceDto[];
}

export interface CompanyDetailsDto {
  companyName: string;
  jobProfile: string;
  numRounds: number;
  jobType: string;
  ctc: number | string;
  workMode: string;
  location: string;
}

export interface CodingRoundInfoDto {
  codingPlatform: string;
  codingDuration: string;
  codingQuestions: QuestionDto[];
  codingDifficulty: string;
  interviewMode: string;
}

export interface TechnicalRoundDto {
  Interviewmode: string;
  Duration: string;
  DSAQuestion: DSAQuestionDto[];
  ComputerCoreQuestion: ComputerCoreQuestionDto[];
  SystemDesignQuestion: SystemDesignQuestionDto[];
  PuzzleBasedQuestion: PuzzleBasedQuestionDto[];
}

export interface HRRoundDto {
  SituationBasedQuestions: SituationBasedQuestionDto[];
  UnexpectedQuestions: UnexpectedQuestionDto[];
}

export interface QuestionDto {
  question: string;
}

export interface BaseQuestionDto extends QuestionDto {
  difficulty: string;
}

export interface DSAQuestionDto extends BaseQuestionDto {
  questionType: string;
}

export interface ComputerCoreQuestionDto extends BaseQuestionDto {
  questionType: string;
}

export interface SystemDesignQuestionDto extends BaseQuestionDto {
  questionType: string;
}

export interface PuzzleBasedQuestionDto extends BaseQuestionDto {}

export interface SituationBasedQuestionDto extends QuestionDto {}

export interface UnexpectedQuestionDto extends QuestionDto {}

export interface ResourceDto {
  category?: string;
  Description?: string;
  Link?: string;
}

