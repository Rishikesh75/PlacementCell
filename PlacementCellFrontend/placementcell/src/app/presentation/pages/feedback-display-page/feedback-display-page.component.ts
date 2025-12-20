import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InterviewFeedbackFacade } from '../../../application/facades';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-feedback-display-page',
  standalone: false,
  templateUrl: './feedback-display-page.component.html',
  styleUrl: '../../../styles/pages/feedback-display-page.less'
})
export class FeedbackDisplayPageComponent implements OnInit {
  feedbacksOnCompany: any[] = []; // Mapped data from /api/feedbackoncompany
  loading = true; // Start with loading state to prevent empty state flash
  error: string | null = null;

  constructor(
    private feedbackFacade: InterviewFeedbackFacade,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFeedbacksOnCompany();
  }

  /**
   * Load all feedback submissions from /api/feedbackoncompany
   */
  async loadFeedbacksOnCompany(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const feedbacks = await firstValueFrom(this.feedbackFacade.getFeedbacksOnCompany()) as any[];
      this.feedbacksOnCompany = feedbacks;
      this.loading = false;
      console.log('✅ Feedbacks loaded successfully:', feedbacks.length, 'items');
      console.log('✅ Feedbacks:', feedbacks);
      
      // Manually trigger change detection
      this.cdr.detectChanges();
    } catch (error) {
      console.error('❌ Error loading feedbacks:', error);
      this.error = 'Failed to load feedback submissions';
      this.loading = false;
      
      // Trigger change detection on error too
      this.cdr.detectChanges();
    }
  }

  /**
   * Refresh the feedback list
   */
  refresh(): void {
    this.loadFeedbacksOnCompany();
  }
}