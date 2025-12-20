/**
 * Feedback On Company Mapper
 * Maps API response from /api/feedbackoncompany to domain entities
 */

import { Injectable } from '@angular/core';
import { FeedbackOnCompanyResponseDto } from '../dtos';
import {
  Feedback,
  CompanyDetails,
  CodingRound,
  TechnicalRound,
  HRRound,
  Resource,
  Question,
  DSAQuestion,
  ComputerCoreQuestion,
  SystemDesignQuestion,
  PuzzleBasedQuestion,
  SituationBasedQuestion,
  UnexpectedQuestion
} from '../../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class FeedbackOnCompanyMapper {
  /**
   * Map API response to CompanyDetails entity
   */
  private mapToCompanyDetails(apiResponse: FeedbackOnCompanyResponseDto): CompanyDetails {
    return new CompanyDetails(
      apiResponse.companyname || 'Unknown Company',
      apiResponse.jobProfile || '',
      apiResponse.numRounds || 0,
      apiResponse.jobType || '',
      apiResponse.ctc || 0,
      apiResponse.workMode || '',
      apiResponse.location || ''
    );
  }

  /**
   * Map API response to CodingRound entity
   */
  private mapToCodingRound(apiResponse: FeedbackOnCompanyResponseDto): CodingRound {
    const codingInfo = apiResponse.codingRoundInfo;
    
    // Handle null/undefined codingRoundInfo
    if (!codingInfo) {
      return new CodingRound('', '', [], '', '');
    }
    
    const codingQuestions = (codingInfo.codingQuestions || []).map(
      (q: string) => new Question(q)
    );
    
    return new CodingRound(
      codingInfo.codingPlatform || '',
      codingInfo.codingDuration || '',
      codingQuestions,
      codingInfo.codingDifficulty || '',
      codingInfo.interviewMode || ''
    );
  }

  /**
   * Map API response to TechnicalRound entity
   */
  private mapToTechnicalRound(apiResponse: FeedbackOnCompanyResponseDto): TechnicalRound {
    const techInfo = apiResponse.technicalRoundInfo;
    
    // Handle null/undefined technicalRoundInfo
    if (!techInfo) {
      return new TechnicalRound('', '', [], [], [], []);
    }
    
    const dsaQuestions: DSAQuestion[] = (techInfo.dsaQuestions || []).map(q => 
      new DSAQuestion(
        q.question,
        'Medium', // Default as API doesn't provide this
        q.questionType || 'General'
      )
    );

    const dbmsQuestions: ComputerCoreQuestion[] = (techInfo.dbmsQuestions || []).map(q => 
      new ComputerCoreQuestion(
        q.question,
        'Medium', // Default as API doesn't provide this
        q.questionType || 'DBMS'
      )
    );

    const systemDesignQuestions: SystemDesignQuestion[] = (techInfo.systemDesignQuestions || []).map(q => 
      new SystemDesignQuestion(
        q.question,
        'Medium', // Default as API doesn't provide this
        q.questionType || 'System Design'
      )
    );

    const puzzleBasedQuestions: PuzzleBasedQuestion[] = (techInfo.puzzleBasedQuestions || []).map(q => 
      new PuzzleBasedQuestion(
        q.question,
        'Medium' // Default as API doesn't provide this
      )
    );

    return new TechnicalRound(
      techInfo.interviewMode || '',
      techInfo.interviewDuration || '',
      dsaQuestions,
      dbmsQuestions,
      systemDesignQuestions,
      puzzleBasedQuestions
    );
  }

  /**
   * Map API response to HRRound entity
   */
  private mapToHRRound(apiResponse: FeedbackOnCompanyResponseDto): HRRound {
    const hrInfo = apiResponse.hrRoundInfo;
    
    // Handle null/undefined hrRoundInfo
    if (!hrInfo) {
      return new HRRound([], []);
    }
    
    const situationBasedQuestions: SituationBasedQuestion[] = 
      (hrInfo.situationBasedQuestions || []).map(q => 
        new SituationBasedQuestion(
          q.answer ? `${q.question} - Answer: ${q.answer}` : q.question
        )
      );

    const unexpectedQuestions: UnexpectedQuestion[] = 
      (hrInfo.unExpectedQuestions || []).map(q => 
        new UnexpectedQuestion(
          q.answer ? `${q.question} - Answer: ${q.answer}` : q.question
        )
      );

    return new HRRound(
      situationBasedQuestions,
      unexpectedQuestions
    );
  }

  /**
   * Map API response to Resource entity array
   */
  private mapToResources(apiResponse: FeedbackOnCompanyResponseDto): Resource[] {
    if (!apiResponse.resourcesInfo || !apiResponse.resourcesInfo.resourcesList) {
      return [];
    }

    return apiResponse.resourcesInfo.resourcesList.map(r => 
      new Resource(
        r.type || '',
        r.description || '',
        r.link || ''
      )
    );
  }

  /**
   * Map complete API response to Feedback domain entity
   */
  mapToFeedbackEntity(apiResponse: FeedbackOnCompanyResponseDto): Feedback {
    const companyDetails = this.mapToCompanyDetails(apiResponse);
    const codingRound = this.mapToCodingRound(apiResponse);
    const technicalRound = this.mapToTechnicalRound(apiResponse);
    const hrRound = this.mapToHRRound(apiResponse);
    const resources = this.mapToResources(apiResponse);

    return new Feedback(
      companyDetails,
      codingRound,
      technicalRound,
      hrRound,
      resources
    );
  }
}

