/**
 * Feedback Display Page Component
 * Displays a list of interview feedback submissions
 */

import { Component, OnInit } from '@angular/core';
import { InterviewFeedbackFacade } from '../../../application/facades';
import { FeedbackResponseDto } from '../../../application/dtos';

@Component({
  selector: 'app-feedback-display-page',
  standalone: false,
  templateUrl: './feedback-display-page.component.html',
  styleUrl: './feedback-display-page.component.less'
})
export class FeedbackDisplayPageComponent implements OnInit {
  feedbacks: FeedbackResponseDto[] = [];
  loading = false;
  error: string | null = null;

  constructor(private feedbackFacade: InterviewFeedbackFacade) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  /**
   * Load all feedback submissions
   */
  loadFeedbacks(): void {
    this.loading = true;
    this.error = null;

    this.feedbackFacade.getAllFeedbacks().subscribe({
      next: (feedbacks) => {
        this.feedbacks = feedbacks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading feedbacks:', error);
        this.error = 'Failed to load feedback submissions';
        this.loading = false;
      }
    });
  }

  /**
   * Filter feedbacks by company
   */
  filterByCompany(companyName: string): void {
    this.loading = true;
    this.error = null;

    this.feedbackFacade.getFeedbacksByCompany(companyName).subscribe({
      next: (feedbacks) => {
        this.feedbacks = feedbacks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error filtering feedbacks:', error);
        this.error = `Failed to load feedbacks for ${companyName}`;
        this.loading = false;
      }
    });
  }

  /**
   * Refresh the feedback list
   */
  refresh(): void {
    this.loadFeedbacks();
  }
}

