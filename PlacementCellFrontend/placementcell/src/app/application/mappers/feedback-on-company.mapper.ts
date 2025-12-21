/**
 * Feedback On Company Mapper
 * Maps API response from /api/feedbackoncompany to domain entities
 * and domain entities back to API request DTOs
 */

import { Injectable } from '@angular/core';
import {
  FeedbackOnCompanyResponseDto,
  FeedbackRequestDto,
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
    // Calculate number of rounds from available round info
    let numRounds = 0;
    if (apiResponse.codingRoundInfo) numRounds++;
    if (apiResponse.technicalRoundInfo) numRounds++;
    if (apiResponse.hrRoundInfo) numRounds++;
    
    return new CompanyDetails(
      apiResponse.company || apiResponse.companyid || 'Unknown Company',
      apiResponse.jobProfile || '',
      numRounds,
      this.mapJobTypeFromEnum(apiResponse.jobType),
      apiResponse.ctc || 0,
      this.mapWorkModeFromEnum(apiResponse.workMode),
      apiResponse.jobLocation || ''
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
    
    const codingQuestions = (codingInfo.questions || []).map(
      (q: string) => new Question(q)
    );
    
    return new CodingRound(
      codingInfo.codingPlatform || '',
      codingInfo.duration || '',
      codingQuestions,
      this.mapDifficultyFromEnum(codingInfo.difficultyLevel),
      this.mapInterviewModeFromEnum(codingInfo.interviewMode)
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
      this.mapInterviewModeFromEnum(techInfo.interviewMode),
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

  /**
   * Map Feedback domain entity to API Request DTO
   * Used when submitting feedback to the API
   */
  mapToApiRequest(feedback: Feedback): FeedbackOnCompanyResponseDto {
    return {
      feedbackid: 'fb124', // This will be generated by the backend
      companyid: 'comp123', // This will be set by the backend or from user input
      company: null,
      alumniid: 'alum123', // This will be set by the backend based on auth
      alumni: null,
      jobProfile: feedback.companyDetails.jobProfile,
      jobType: this.mapJobTypeToEnum(feedback.companyDetails.jobType),
      jobLocation: feedback.companyDetails.location,
      ctc: typeof feedback.companyDetails.ctc === 'string' 
        ? feedback.companyDetails.ctc 
        : feedback.companyDetails.ctc.toString(),
      workMode: this.mapWorkModeToEnum(feedback.companyDetails.workMode),
      codingRoundInfo: {
        codingPlatform: feedback.codingRound.codingPlatform,
        duration: feedback.codingRound.codingDuration,
        questions: feedback.codingRound.codingQuestions.map(q => q.question),
        difficultyLevel: this.mapDifficultyToEnum(feedback.codingRound.codingDifficulty),
        interviewMode: this.mapInterviewModeToEnum(feedback.codingRound.interviewMode)
      },
      technicalRoundInfo: {
        interviewMode: this.mapInterviewModeToEnum(feedback.technicalRound.interviewMode),
        interviewDuration: feedback.technicalRound.duration,
        dsaQuestions: feedback.technicalRound.dsaQuestions.map(q => ({
          questionType: q.questionType,
          question: q.question
        })),
        dbmsQuestions: feedback.technicalRound.computerCoreQuestions.map(q => ({
          questionType: q.questionType,
          question: q.question
        })),
        systemDesignQuestions: feedback.technicalRound.systemDesignQuestions.map(q => ({
          questionType: q.questionType,
          question: q.question
        })),
        puzzleBasedQuestions: feedback.technicalRound.puzzleBasedQuestions.map(q => ({
          question: q.question
        }))
      },
      hrRoundInfo: {
        interviewMode: 0, // Default to Online, or get from feedback if available
        interviewDuration: '30 minutes', // Default or get from feedback
        situationBasedQuestions: feedback.hrRound.situationBasedQuestions.map(q => ({
          question: q.question,
          answer: undefined
        })),
        unExpectedQuestions: feedback.hrRound.unexpectedQuestions.map(q => ({
          question: q.question,
          answer: undefined
        }))
      },
      resourcesInfo: {
        resourcesList: feedback.resources.map(r => ({
          type: r.category,
          link: r.link,
          description: r.description
        }))
      }
    };
  }

  /**
   * Helper methods to convert between string representations and enum values
   */
  private mapJobTypeToEnum(jobType: string): number {
    const jobTypeMap: { [key: string]: number } = {
      'Full Time': 0,
      'FullTime': 0,
      'Internship': 1,
      'Contract': 2
    };
    return jobTypeMap[jobType] ?? 0;
  }

  private mapWorkModeToEnum(workMode: string): number {
    const workModeMap: { [key: string]: number } = {
      'Remote': 0,
      'Office': 1,
      'Hybrid': 2
    };
    return workModeMap[workMode] ?? 0;
  }

  private mapInterviewModeToEnum(interviewMode: string): number {
    const modeMap: { [key: string]: number } = {
      'Online': 0,
      'Offline': 1,
      'Hybrid': 2
    };
    return modeMap[interviewMode] ?? 0;
  }

  private mapDifficultyToEnum(difficulty: string): number {
    const difficultyMap: { [key: string]: number } = {
      'Easy': 0,
      'Medium': 1,
      'Hard': 2
    };
    return difficultyMap[difficulty] ?? 1;
  }

  private mapInterviewModeFromEnum(mode: number): string {
    const modeMap: { [key: number]: string } = {
      0: 'Online',
      1: 'Offline',
      2: 'Hybrid'
    };
    return modeMap[mode] ?? 'Online';
  }

  private mapDifficultyFromEnum(difficulty: number): string {
    const difficultyMap: { [key: number]: string } = {
      0: 'Easy',
      1: 'Medium',
      2: 'Hard'
    };
    return difficultyMap[difficulty] ?? 'Medium';
  }

  private mapJobTypeFromEnum(jobType: number): string {
    const jobTypeMap: { [key: number]: string } = {
      0: 'Full Time',
      1: 'Internship',
      2: 'Contract'
    };
    return jobTypeMap[jobType] ?? 'Full Time';
  }

  private mapWorkModeFromEnum(workMode: number): string {
    const workModeMap: { [key: number]: string } = {
      0: 'Remote',
      1: 'Office',
      2: 'Hybrid'
    };
    return workModeMap[workMode] ?? 'Office';
  }
}

