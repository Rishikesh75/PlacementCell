import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Feedback } from '../../domain/entities';
import { FeedbackRequestDto, FeedbackResponseDto } from '../dtos';
import { FeedbackMapper } from '../mappers';
import { SubmitFeedbackUseCase } from '../use-cases/submit-feedback.use-case';
import { GetAllFeedbacksUseCase } from '../use-cases/get-all-feedbacks.use-case';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFacade {
  constructor(
    private submitFeedbackUseCase: SubmitFeedbackUseCase,
    private getAllFeedbacksUseCase: GetAllFeedbacksUseCase,
    private feedbackMapper: FeedbackMapper
  ) {}

  submitFeedback(data: FeedbackRequestDto): Observable<FeedbackResponseDto> {
    // Convert DTO to entity
    const entity = this.feedbackMapper.fromResponseDto(data as FeedbackResponseDto);
    // Execute use case and convert back to DTO
    return this.submitFeedbackUseCase.execute(entity).pipe(
      map(result => this.feedbackMapper.toRequestDto(result) as FeedbackResponseDto)
    );
  }

  getAllFeedbacks(): Observable<FeedbackResponseDto[]> {
    return this.getAllFeedbacksUseCase.execute().pipe(
      map(entities => entities.map(e => this.feedbackMapper.toRequestDto(e) as FeedbackResponseDto))
    );
  }
}

