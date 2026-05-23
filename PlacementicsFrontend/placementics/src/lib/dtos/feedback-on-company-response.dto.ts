export interface FeedbackOnCompanyResponseDto {
  Id?: string;
  CompanyId?: string;
  company: string | null;
  AlumniId?: string;
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

export interface CodingRoundInfoApiDto {
  codingPlatform: string;
  Duration: string;
  questions: string[];
  difficultyLevel: number;
  interviewMode: number;
}

export interface TechnicalRoundInfoApiDto {
  interviewMode: number;
  interviewDuration: string;
  dsaQuestions: TechnicalQuestionApiDto[];
  CoreCSQuestions: TechnicalQuestionApiDto[];
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
  Description: string;
}

export enum JobTypeEnum {
  FullTime = 0,
  Internship = 1,
  Contract = 2,
}

export enum WorkModeEnum {
  Remote = 0,
  Office = 1,
  Hybrid = 2,
}

export enum InterviewModeEnum {
  Online = 0,
  Offline = 1,
  Hybrid = 2,
}

export enum DifficultyLevelEnum {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export interface DSAQuestionDto {
  questionType: string;
  question: string;
  difficulty: string;
}

export interface ComputerCoreQuestionDto {
  questionType: string;
  question: string;
  difficulty: string;
}

export interface SystemDesignQuestionDto {
  questionType: string;
  question: string;
  difficulty: string;
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

export interface CodingRoundInfoDto {
  codingPlatform: string;
  codingDuration: string;
  codingQuestions: { question: string }[];
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

export interface CompanyDetailsDto {
  companyName: string;
  jobProfile: string;
  numRounds: number;
  jobType: string;
  ctc: number | string;
  workMode: string;
  location: string;
}

export interface ResourceDto {
  category: string;
  Description: string;
  Link: string;
}

export interface FeedbackRequestDto {
  companydetails: CompanyDetailsDto;
  codingroundinfo: CodingRoundInfoDto;
  TechnicalRound: TechnicalRoundDto;
  HRRound: HRRoundDto;
  Resources: ResourceDto[];
}

export interface FeedbackResponseDto {
  companydetails: CompanyDetailsDto;
  codingroundinfo: CodingRoundInfoDto;
  TechnicalRound: TechnicalRoundDto;
  HRRound: HRRoundDto;
  Resources: ResourceDto[];
}
