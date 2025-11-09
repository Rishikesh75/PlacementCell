export interface FeedbackCardData {
  companydetails: CompanyDetails;
  codingroundinfo: CodingRoundInfo;
  TechnicalRound: TechnicalRound;
  HRRound: HRRound;
  Resources: Resources[];
}

export interface CompanyDetails {
  companyName: string;
  jobProfile: string;
  numRounds: number;
  jobType: string;
  ctc: number | string;
  workMode: string;
  location: string;
}

export interface CodingRoundInfo {
  codingPlatform: string;
  codingDuration: string;
  codingQuestions: Question[];
  codingDifficulty: string;
  interviewMode: string;
}

export interface TechnicalRound {
  Interviewmode: string;
  Duration: string;
  DSAQuestion: DSAQuestion[];
  ComputerCoreQuestion: ComputerCoreQuestion[];
  SystemDesignQuestion: SystemDesignQuestion[];
  PuzzleBasedQuestion: PuzzleBasedQuestion[];
}

export interface HRRound {
  SituationBasedQuestions: SituationBasedQuestions[];
  UnexpectedQuestions: UnexpectedQuestions[];
}

export interface Question {
  question: string;
}

/* Technical Interview Questions */
export interface BaseQuestion extends Question {
  difficulty: string;
}

export interface PuzzleBasedQuestion extends BaseQuestion {}

export interface DSAQuestion extends BaseQuestion {
  questionType: string;
}

export interface ComputerCoreQuestion extends BaseQuestion {
  questionType: string;
}

export interface SystemDesignQuestion extends BaseQuestion {
  questionType: string;
}

/* HR Round Questions */
export interface SituationBasedQuestions extends Question {}
export interface UnexpectedQuestions extends Question {}

/* Resource Section */
export interface Resources {
  category?: string;
  Description?: string;
  Link?: string;
}

