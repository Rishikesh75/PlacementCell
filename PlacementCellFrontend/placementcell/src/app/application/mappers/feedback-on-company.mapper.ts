/**
 * Feedback On Company Mapper
 * Maps API response from /api/feedbackoncompany to component-friendly format
 */

import {
  FeedbackOnCompanyResponseDto,
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
   * Map difficulty level number to string
   */
  static mapDifficultyLevel(difficultyLevel: number): string {
    switch (difficultyLevel) {
      case 0:
        return 'Easy';
      case 1:
        return 'Medium';
      case 2:
        return 'Hard';
      default:
        return 'Medium';
    }
  }

  /**
   * Map API response to CompanyDetailsDto
   */
  static mapToCompanyDetails(apiResponse: FeedbackOnCompanyResponseDto): CompanyDetailsDto {
    return {
      companyName: apiResponse.companydetails.companyname || 'Unknown Company',
      jobProfile: apiResponse.companydetails.jobProfile,
      numRounds: apiResponse.companydetails.numRounds,
      jobType: apiResponse.companydetails.jobType,
      ctc: apiResponse.companydetails.ctc,
      workMode: apiResponse.companydetails.workMode,
      location: apiResponse.companydetails.location,
    };
  }

  /**
   * Calculate the number of rounds based on available round info
   */
  private static calculateNumRounds(apiResponse: FeedbackOnCompanyResponseDto): number {
    let rounds = 0;
    if (apiResponse.codingRoundInfo && apiResponse.codingRoundInfo.codingQuestions?.length > 0) {
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
      codingDuration: codingInfo.codingDuration,
      codingQuestions: codingInfo.codingQuestions.map(q => ({ question: q })),
      codingDifficulty: codingInfo.codingDifficulty,
      interviewMode: codingInfo.interviewMode
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
      Interviewmode: techInfo.interviewMode,
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
      feedbackId: apiResponse.companydetails.feedbackid,
      companyName: apiResponse.companydetails.companyname,
      alumniId: apiResponse.companydetails.alumniid,
      companyDetails: this.mapToCompanyDetails(apiResponse),
      codingRoundInfo: this.mapToCodingRoundInfo(apiResponse),
      technicalRound: this.mapToTechnicalRound(apiResponse),
      hrRound: this.mapToHRRound(apiResponse),
      resources: this.mapToResources(apiResponse)
    };
  }
}

