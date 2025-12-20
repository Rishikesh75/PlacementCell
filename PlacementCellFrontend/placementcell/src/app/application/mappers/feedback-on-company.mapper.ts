/**
 * Feedback On Company Mapper
 * Maps API response from /api/feedbackoncompany to component-friendly format
 */

import {
  FeedbackOnCompanyResponseDto,
  CodingRoundInfoApiDto,
  TechnicalRoundInfoApiDto,
  HRRoundInfoApiDto,
  ResourcesInfoApiDto,
  CompanyDetails,
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
   mapDifficultyLevel(difficultyLevel: number): string {
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
   mapToCompanyDetails(apiResponse: FeedbackOnCompanyResponseDto): CompanyDetails {
    return {
    companyname: apiResponse.companydetails.companyname || 'Unknown Company',
    jobProfile: apiResponse.companydetails.jobProfile,
    numRounds: apiResponse.companydetails.numRounds,
    jobType: apiResponse.companydetails.jobType,
    ctc: apiResponse.companydetails.ctc,
    workMode: apiResponse.companydetails.workMode,
    location: apiResponse.companydetails.location,
    feedbackid: '',
    alumniid: '',
    jobLocation: '',
  };
  }

  /**
   * Calculate the number of rounds based on available round info
   */
  private  calculateNumRounds(apiResponse: FeedbackOnCompanyResponseDto): number {
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
   mapToCodingRoundInfo(apiResponse: FeedbackOnCompanyResponseDto): CodingRoundInfoApiDto {
    const codingInfo = apiResponse.codingRoundInfo;
    return {
      codingPlatform: codingInfo.codingPlatform,
      codingDuration: codingInfo.codingDuration,
      codingQuestions: codingInfo.codingQuestions,
      codingDifficulty: codingInfo.codingDifficulty,
      interviewMode: codingInfo.interviewMode
    };
  }

  /**
   * Map API response to TechnicalRoundDto
   */
   mapToTechnicalRound(apiResponse: FeedbackOnCompanyResponseDto): TechnicalRoundInfoApiDto {
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
      interviewMode: techInfo.interviewMode,
      interviewDuration: techInfo.interviewDuration,
      dsaQuestions: dsaQuestions,
      dbmsQuestions: dbmsQuestions,
      systemDesignQuestions: systemDesignQuestions,
      puzzleBasedQuestions: puzzleBasedQuestions
    };
  }

  /**
   * Map API response to HRRoundDto
   */
   mapToHRRound(apiResponse: FeedbackOnCompanyResponseDto): HRRoundInfoApiDto {
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
      situationBasedQuestions: situationBasedQuestions,
      unExpectedQuestions: unexpectedQuestions
    };
  }

  /**
   * Map API response to ResourceApiDto array
   */
   mapToResources(apiResponse: FeedbackOnCompanyResponseDto): any[] {
    if (!apiResponse.resourcesInfo || !apiResponse.resourcesInfo.resourcesList) {
      return [];
    }

    return apiResponse.resourcesInfo.resourcesList.map(r => ({
      type: r.type,
      link: r.link,
      description: r.description
    }));
  }

  /**
   * Map complete API response to all required DTOs
   */
   mapFeedbackOnCompanyResponse(apiResponse: FeedbackOnCompanyResponseDto) {
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

