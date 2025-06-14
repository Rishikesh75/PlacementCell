import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyFeedbackData } from './company-feedback-data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-feed-back-form',
  imports: [FormsModule],
  templateUrl: './company-feed-back-form.component.html',
  styleUrls: ['./company-feed-back-form.component.less']
})
export class CompanyFeedBackFormComponent {

  public new_feedback: CompanyFeedbackData = {
    company_name: '',
    Overall_performance: 0,
    Food_Review: 0,
    Addtional_feedback: ''
  };

  constructor(private router: Router) {}

  submit_feedback() {
    console.log("Feedback submitted:", this.new_feedback);
    alert('Feedback submitted successfully!');
    this.router.navigate(['/company-review-display']);
  }
}
