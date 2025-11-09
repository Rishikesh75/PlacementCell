/**
 * Infrastructure Providers
 * Configure dependency injection for infrastructure layer
 */

import { Provider } from '@angular/core';
import { FEEDBACK_REPOSITORY_TOKEN } from '../domain/interfaces';
import { FeedbackRepository } from './repositories';
import { FeedbackApiService } from './api';
import { FeedbackMapper } from '../application/mappers';
import { SubmitFeedbackUseCase, GetAllFeedbacksUseCase, GetFeedbacksByCompanyUseCase } from '../application/use-cases';
import { InterviewFeedbackFacade } from '../application/facades';

/**
 * Provide the feedback repository implementation
 */
export const provideFeedbackRepository = (): Provider => ({
  provide: FEEDBACK_REPOSITORY_TOKEN,
  useClass: FeedbackRepository
});

/**
 * All infrastructure providers
 * Includes all services, use cases, mappers, and facades for the interview feedback feature
 */
export const INFRASTRUCTURE_PROVIDERS: Provider[] = [
  // Infrastructure
  FeedbackApiService,
  FeedbackRepository,
  provideFeedbackRepository(),
  
  // Application
  FeedbackMapper,
  SubmitFeedbackUseCase,
  GetAllFeedbacksUseCase,
  GetFeedbacksByCompanyUseCase,
  InterviewFeedbackFacade
];

