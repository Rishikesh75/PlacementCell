/**
 * Injection Token for Feedback Repository
 * 
 * This token is used for dependency injection since interfaces
 * don't exist at runtime in TypeScript
 */

import { InjectionToken } from '@angular/core';
import { IFeedbackRepository } from './feedback-repository.interface';

export const FEEDBACK_REPOSITORY_TOKEN = new InjectionToken<IFeedbackRepository>(
  'FeedbackRepository'
);

