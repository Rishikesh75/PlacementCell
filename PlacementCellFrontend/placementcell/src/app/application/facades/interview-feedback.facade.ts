/**
 * Interview Feedback Facade
 * Provides a simplified interface for feedback operations
 */

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Feedback } from '../../domain/entities';
import { SubmitFeedbackUseCase, GetAllFeedbacksUseCase, GetFeedbacksByCompanyUseCase, GetFeedbacksOnCompanyUseCase } from '../use-cases';
import { FeedbackMapper, FeedbackOnCompanyMapper } from '../mappers';
import { FeedbackRequestDto, FeedbackResponseDto, FeedbackOnCompanyResponseDto } from '../dtos';

@Injectable()
export class InterviewFeedbackFacade {
  constructor(
    private submitFeedbackUseCase: SubmitFeedbackUseCase,
    private getAllFeedbacksUseCase: GetAllFeedbacksUseCase,
    private getFeedbacksByCompanyUseCase: GetFeedbacksByCompanyUseCase,
    private getFeedbacksOnCompanyUseCase: GetFeedbacksOnCompanyUseCase,
    private feedbackMapper: FeedbackMapper
  ) {}

  /**
   * Submit interview feedback
   * @param feedbackDto - The feedback DTO
   * @returns Observable of submitted feedback DTO
   */
  submitFeedback(feedbackDto: FeedbackRequestDto): Observable<FeedbackResponseDto> {
    const feedbackEntity = this.feedbackMapper.fromResponseDto(feedbackDto as FeedbackResponseDto);
    return this.submitFeedbackUseCase.execute(feedbackEntity).pipe(
      map(entity => this.feedbackMapper.toRequestDto(entity) as FeedbackResponseDto)
    );
  }

  /**
   * Get all feedbacks
   * @returns Observable of feedback DTOs array
   */
  getAllFeedbacks(): Observable<FeedbackResponseDto[]> {
    return this.getAllFeedbacksUseCase.execute().pipe(
      map(entities => entities.map(e => this.feedbackMapper.toRequestDto(e) as FeedbackResponseDto))
    );
  }

  /**
   * Get feedbacks by company name
   * @param companyName - The company name
   * @returns Observable of feedback DTOs array
   */
  getFeedbacksByCompany(companyName: string): Observable<FeedbackResponseDto[]> {
    return this.getFeedbacksByCompanyUseCase.execute(companyName).pipe(
      map(entities => entities.map(e => this.feedbackMapper.toRequestDto(e) as FeedbackResponseDto))
    );
  }

  /**
   * Get all feedbacks on company from /api/feedbackoncompany endpoint
   * Returns mapped data ready for display in feedback cards
   * @returns Observable of mapped feedback data array
   */
  getFeedbacksOnCompany(): Observable<any[]> {
    return this.getFeedbacksOnCompanyUseCase.execute().pipe(
      map(apiResponses => apiResponses.map(response => 
        FeedbackOnCompanyMapper.mapFeedbackOnCompanyResponse(response)
      ))
    );
  }

  /**
   * Create an empty feedback DTO
   * @returns Empty feedback request DTO
   */
  createEmptyFeedback(): FeedbackRequestDto {
    return {
      companydetails: {
        companyName: '',
        jobProfile: '',
        numRounds: 0,
        jobType: '',
        ctc: 6,
        workMode: '',
        location: ''
      },
      codingroundinfo: {
        codingPlatform: '',
        codingDuration: '',
        codingQuestions: [],
        codingDifficulty: '',
        interviewMode: ''
      },
      TechnicalRound: {
        Interviewmode: '',
        Duration: '',
        DSAQuestion: [],
        ComputerCoreQuestion: [],
        SystemDesignQuestion: [],
        PuzzleBasedQuestion: []
      },
      HRRound: {
        SituationBasedQuestions: [],
        UnexpectedQuestions: []
      },
      Resources: []
    };
  }
}

