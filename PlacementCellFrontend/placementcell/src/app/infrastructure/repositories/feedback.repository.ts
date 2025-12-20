/**
 * Feedback Repository Implementation
 * Implements the IFeedbackRepository interface
 */

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Feedback } from '../../domain/entities';
import { IFeedbackRepository } from '../../domain/interfaces';
import { FeedbackApiService } from '../api/feedback-api.service';
import { FeedbackMapper } from '../../application/mappers';

@Injectable()
export class FeedbackRepository implements IFeedbackRepository {
  constructor(
    private feedbackApi: FeedbackApiService,
    private feedbackMapper: FeedbackMapper
  ) {}

  
}
