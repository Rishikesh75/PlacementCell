/**
 * Feedback On Company Mapper
 * Maps API response from /api/feedbackoncompany to component-friendly format
 */

import {
  FeedbackOnCompanyResponseDto,
  JobTypeEnum,
  WorkModeEnum,
  InterviewModeEnum,
  DifficultyLevelEnum,
  CompanyDetailsDto,
  CodingRoundInfoDto,
  TechnicalRoundDto,
  HRRoundDto,
  ResourceDto,
  DSAQuestionDto,
  ComputerCoreQuestionDto,
  SystemDesignQuestionDto,
  PuzzleBasedQuestionDto,
  SituationBasedQuestionDto,
  UnexpectedQuestionDto
} from '../dtos';

export class FeedbackOnCompanyMapper {
  /**
   * Map job type enum to string
   */
  static mapJobType(jobType: number): string {
    switch (jobType) {
      case JobTypeEnum.FullTime:
        return 'Full-Time';
      case JobTypeEnum.Internship:
        return 'Internship';
      case JobTypeEnum.Contract:
        return 'Contract';
      default:
        return 'Unknown';
    }
  }

  /**
   * Map work mode enum to string
   */
  static mapWorkMode(workMode: number): string {
    switch (workMode) {
      case WorkModeEnum.Remote:
        return 'Remote';
      case WorkModeEnum.Office:
        return 'Office';
      case WorkModeEnum.Hybrid:
        return 'Hybrid';
      default:
        return 'Unknown';
    }
  }

  /**
   * Map interview mode enum to string
   */
  static mapInterviewMode(interviewMode: number): string {
    switch (interviewMode) {
      case InterviewModeEnum.Online:
        return 'Online';
      case InterviewModeEnum.Offline:
        return 'Offline';
      case InterviewModeEnum.Hybrid:
        return 'Hybrid';
      default:
        return 'Unknown';
    }
  }

  /**
   * Map difficulty level enum to string
   */
  static mapDifficultyLevel(difficultyLevel: number): string {
    switch (difficultyLevel) {
      case DifficultyLevelEnum.Easy:
        return 'Easy';
      case DifficultyLevelEnum.Medium:
        return 'Medium';
      case DifficultyLevelEnum.Hard:
        return 'Hard';
      default:
        return 'Unknown';
    }
  }

  /**
   * Map API response to CompanyDetailsDto
   */
  static mapToCompanyDetails(apiResponse: FeedbackOnCompanyResponseDto): CompanyDetailsDto {
    return {
      companyName: apiResponse.company || 'Unknown Company',
      jobProfile: apiResponse.jobProfile,
      numRounds: this.calculateNumRounds(apiResponse),
      jobType: this.mapJobType(apiResponse.jobType),
      ctc: apiResponse.ctc,
      workMode: this.mapWorkMode(apiResponse.workMode),
      location: apiResponse.jobLocation
    };
  }

  /**
   * Calculate the number of rounds based on available round info
   */
  private static calculateNumRounds(apiResponse: FeedbackOnCompanyResponseDto): number {
    let rounds = 0;
    if (apiResponse.codingRoundInfo && apiResponse.codingRoundInfo.questions?.length > 0) {
      rounds++;
    }
    if (apiResponse.technicalRoundInfo) {
      rounds++;
    }
    if (apiResponse.hrRoundInfo) {
      rounds++;
    }
    return rounds;
  }

  /**
   * Map API response to CodingRoundInfoDto
   */
  static mapToCodingRoundInfo(apiResponse: FeedbackOnCompanyResponseDto): CodingRoundInfoDto {
    const codingInfo = apiResponse.codingRoundInfo;
    return {
      codingPlatform: codingInfo.codingPlatform,
      codingDuration: codingInfo.duration,
      codingQuestions: codingInfo.questions.map(q => ({ question: q })),
      codingDifficulty: this.mapDifficultyLevel(codingInfo.difficultyLevel),
      interviewMode: this.mapInterviewMode(codingInfo.interviewMode)
    };
  }

  /**
   * Map API response to TechnicalRoundDto
   */
  static mapToTechnicalRound(apiResponse: FeedbackOnCompanyResponseDto): TechnicalRoundDto {
    const techInfo = apiResponse.technicalRoundInfo;
    
    const dsaQuestions: DSAQuestionDto[] = techInfo.dsaQuestions.map(q => ({
      questionType: q.questionType || 'General',
      question: q.question,
      difficulty: 'Medium' // Default as API doesn't provide this
    }));

    const dbmsQuestions: ComputerCoreQuestionDto[] = techInfo.dbmsQuestions.map(q => ({
      questionType: q.questionType || 'DBMS',
      question: q.question,
      difficulty: 'Medium' // Default as API doesn't provide this
    }));

    const systemDesignQuestions: SystemDesignQuestionDto[] = techInfo.systemDesignQuestions.map(q => ({
      questionType: q.questionType || 'System Design',
      question: q.question,
      difficulty: 'Medium' // Default as API doesn't provide this
    }));

    const puzzleBasedQuestions: PuzzleBasedQuestionDto[] = techInfo.puzzleBasedQuestions.map(q => ({
      question: q.question,
      difficulty: 'Medium' // Default as API doesn't provide this
    }));

    return {
      Interviewmode: this.mapInterviewMode(techInfo.interviewMode),
      Duration: techInfo.interviewDuration,
      DSAQuestion: dsaQuestions,
      ComputerCoreQuestion: dbmsQuestions,
      SystemDesignQuestion: systemDesignQuestions,
      PuzzleBasedQuestion: puzzleBasedQuestions
    };
  }

  /**
   * Map API response to HRRoundDto
   */
  static mapToHRRound(apiResponse: FeedbackOnCompanyResponseDto): HRRoundDto {
    const hrInfo = apiResponse.hrRoundInfo;
    
    const situationBasedQuestions: SituationBasedQuestionDto[] = 
      hrInfo.situationBasedQuestions.map(q => ({
        question: q.answer ? `${q.question} - Answer: ${q.answer}` : q.question
      }));

    const unexpectedQuestions: UnexpectedQuestionDto[] = 
      hrInfo.unExpectedQuestions.map(q => ({
        question: q.answer ? `${q.question} - Answer: ${q.answer}` : q.question
      }));

    return {
      SituationBasedQuestions: situationBasedQuestions,
      UnexpectedQuestions: unexpectedQuestions
    };
  }

  /**
   * Map API response to ResourceDto array
   */
  static mapToResources(apiResponse: FeedbackOnCompanyResponseDto): ResourceDto[] {
    if (!apiResponse.resourcesInfo || !apiResponse.resourcesInfo.resourcesList) {
      return [];
    }

    return apiResponse.resourcesInfo.resourcesList.map(r => ({
      category: r.type,
      Description: r.description,
      Link: r.link
    }));
  }

  /**
   * Map complete API response to all required DTOs
   */
  static mapFeedbackOnCompanyResponse(apiResponse: FeedbackOnCompanyResponseDto) {
    return {
      feedbackId: apiResponse.feedbackid,
      companyId: apiResponse.companyid,
      alumniId: apiResponse.alumniid,
      companyDetails: this.mapToCompanyDetails(apiResponse),
      codingRoundInfo: this.mapToCodingRoundInfo(apiResponse),
      technicalRound: this.mapToTechnicalRound(apiResponse),
      hrRound: this.mapToHRRound(apiResponse),
      resources: this.mapToResources(apiResponse)
    };
  }
}

