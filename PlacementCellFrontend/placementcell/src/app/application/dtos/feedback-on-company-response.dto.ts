/**
 * Feedback On Company Response DTO
 * Data Transfer Object for receiving feedback data from /api/feedbackoncompany endpoint
 * This matches the exact API response structure
 */

export interface FeedbackOnCompanyResponseDto {
  feedbackid: string;
  companyid: string;
  company: string | null;
  alumniid: string;
  alumni: string | null;
  jobProfile: string;
  jobType: number;
  jobLocation: string;
  ctc: string;
  workMode: number;
  codingRoundInfo: CodingRoundInfoApiDto;
  technicalRoundInfo: TechnicalRoundInfoApiDto;
  hrRoundInfo: HRRoundInfoApiDto;
  resourcesInfo: ResourcesInfoApiDto;
}

export interface CompanyDetails
{
  feedbackid: string;
  companyname: string;
  alumniid: string;
  numRounds : number;
  jobProfile: string;
  jobType: string;
  jobLocation: string;
  ctc: number;
  workMode: string;
  location:string;
}
export interface CodingRoundInfoApiDto {
  codingPlatform: string;
  duration: string;
  questions: string[];
  difficultyLevel: number;
  interviewMode: number;
}

export interface TechnicalRoundInfoApiDto {
  interviewMode: number;
  interviewDuration: string;
  dsaQuestions: TechnicalQuestionApiDto[];
  dbmsQuestions: TechnicalQuestionApiDto[];
  systemDesignQuestions: TechnicalQuestionApiDto[];
  puzzleBasedQuestions: TechnicalQuestionApiDto[];
}

export interface TechnicalQuestionApiDto {
  questionType?: string;
  question: string;
}

export interface HRRoundInfoApiDto {
  interviewMode: number;
  interviewDuration: string;
  situationBasedQuestions: HRQuestionApiDto[];
  unExpectedQuestions: HRQuestionApiDto[];
}

export interface HRQuestionApiDto {
  question: string;
  answer?: string;
}

export interface ResourcesInfoApiDto {
  resourcesList: ResourceApiDto[];
}

export interface ResourceApiDto {
  type: string;
  link: string;
  description: string;
}

/**
 * Enum mappings for the API response
 */
export enum JobTypeEnum {
  FullTime = 0,
  Internship = 1,
  Contract = 2
}

export enum WorkModeEnum {
  Remote = 0,
  Office = 1,
  Hybrid = 2
}

export enum InterviewModeEnum {
  Online = 0,
  Offline = 1,
  Hybrid = 2
}

export enum DifficultyLevelEnum {
  Easy = 0,
  Medium = 1,
  Hard = 2
}

/**
 * Question DTOs for different types of interview questions
 */

// DSA Question DTO (for Technical Round)
export interface DSAQuestionDto {
  questionType: string;
  question: string;
  difficulty: string;
}

// Computer Core Question DTO (for DBMS, OS, CN, etc.)
export interface ComputerCoreQuestionDto {
  questionType: string;
  question: string;
  difficulty: string;
}

// System Design Question DTO
export interface SystemDesignQuestionDto {
  questionType: string;
  question: string;
  difficulty: string;
}

// Puzzle Based Question DTO
export interface PuzzleBasedQuestionDto {
  question: string;
  difficulty: string;
}

// Situation Based Question DTO (for HR Round)
export interface SituationBasedQuestionDto {
  question: string;
}

// Unexpected Question DTO (for HR Round)
export interface UnexpectedQuestionDto {
  question: string;
}

/**
 * Request and Response DTOs for Feedback submission
 */

// Coding Round Info DTO for Request
export interface CodingRoundInfoDto {
  codingPlatform: string;
  codingDuration: string;
  codingQuestions: { question: string }[];
  codingDifficulty: string;
  interviewMode: string;
}

// Technical Round DTO for Request
export interface TechnicalRoundDto {
  Interviewmode: string;
  Duration: string;
  DSAQuestion: DSAQuestionDto[];
  ComputerCoreQuestion: ComputerCoreQuestionDto[];
  SystemDesignQuestion: SystemDesignQuestionDto[];
  PuzzleBasedQuestion: PuzzleBasedQuestionDto[];
}

// HR Round DTO for Request
export interface HRRoundDto {
  SituationBasedQuestions: SituationBasedQuestionDto[];
  UnexpectedQuestions: UnexpectedQuestionDto[];
}

// Company Details DTO for Request
export interface CompanyDetailsDto {
  companyName: string;
  jobProfile: string;
  numRounds: number;
  jobType: string;
  ctc: number | string;
  workMode: string;
  location: string;
}

// Resource DTO for Request
export interface ResourceDto {
  category: string;
  Description: string;
  Link: string;
}

// Feedback Request DTO
export interface FeedbackRequestDto {
  companydetails: CompanyDetailsDto;
  codingroundinfo: CodingRoundInfoDto;
  TechnicalRound: TechnicalRoundDto;
  HRRound: HRRoundDto;
  Resources: ResourceDto[];
}

// Feedback Response DTO
export interface FeedbackResponseDto {
  companydetails: CompanyDetailsDto;
  codingroundinfo: CodingRoundInfoDto;
  TechnicalRound: TechnicalRoundDto;
  HRRound: HRRoundDto;
  Resources: ResourceDto[];
}

