/**
 * Feedback DTOs
 * Data Transfer Objects for component-friendly format
 * These are mapped from API response DTOs to a format suitable for UI components
 */

/**
 * Company Details DTO
 */
export interface CompanyDetailsDto {
  companyName: string;
  jobProfile: string;
  numRounds: number;
  jobType: string;
  ctc: string | number;
  workMode: string;
  location: string;
}

/**
 * Coding Round Info DTO
 */
export interface CodingRoundInfoDto {
  codingPlatform: string;
  codingDuration: string;
  codingQuestions: { question: string }[];
  codingDifficulty: string;
  interviewMode: string;
}

/**
 * Technical Round DTO
 */
export interface TechnicalRoundDto {
  Interviewmode: string;
  Duration: string;
  DSAQuestion: DSAQuestionDto[];
  ComputerCoreQuestion: ComputerCoreQuestionDto[];
  SystemDesignQuestion: SystemDesignQuestionDto[];
  PuzzleBasedQuestion: PuzzleBasedQuestionDto[];
}

/**
 * HR Round DTO
 */
export interface HRRoundDto {
  SituationBasedQuestions: SituationBasedQuestionDto[];
  UnexpectedQuestions: UnexpectedQuestionDto[];
}

/**
 * Resource DTO
 */
export interface ResourceDto {
  category: string;
  Description: string;
  Link: string;
}

/**
 * Question DTOs
 */
export interface QuestionDto {
  question: string;
}

export interface DSAQuestionDto {
  question: string;
  difficulty: string;
  questionType: string;
}

export interface ComputerCoreQuestionDto {
  question: string;
  difficulty: string;
  questionType: string;
}

export interface SystemDesignQuestionDto {
  question: string;
  difficulty: string;
  questionType: string;
}

export interface PuzzleBasedQuestionDto {
  question: string;
  difficulty: string;
}

export interface SituationBasedQuestionDto {
  question: string;
}

export interface UnexpectedQuestionDto {
  question: string;
}

/**
 * Complete Feedback Request DTO (for submitting feedback)
 */
export interface FeedbackRequestDto {
  companydetails: CompanyDetailsDto;
  codingroundinfo: CodingRoundInfoDto;
  TechnicalRound: TechnicalRoundDto;
  HRRound: HRRoundDto;
  Resources: ResourceDto[];
}

/**
 * Complete Feedback Response DTO (for receiving feedback)
 */
export interface FeedbackResponseDto {
  companydetails: CompanyDetailsDto;
  codingroundinfo: CodingRoundInfoDto;
  TechnicalRound: TechnicalRoundDto;
  HRRound: HRRoundDto;
  Resources: ResourceDto[];
}

