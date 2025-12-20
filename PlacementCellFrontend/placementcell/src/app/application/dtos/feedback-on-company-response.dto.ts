/**
 * Feedback On Company Response DTO
 * Data Transfer Object for receiving feedback data from /api/feedbackoncompany endpoint
 * This matches the exact API response structure
 */

export interface FeedbackOnCompanyResponseDto {
  companydetails : CompanyDetails
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
  codingDuration: string;
  codingQuestions: string[];
  codingDifficulty: string;
  interviewMode: string;
}

export interface TechnicalRoundInfoApiDto {
  interviewMode: string;
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

