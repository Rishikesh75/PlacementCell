import { Component, Input } from '@angular/core';
import { 
  CompanyDetails, 
  CodingRoundInfo, 
  TechnicalRound, 
  HRRound, 
  Resources 
} from '../../../domain/entities/feedback.entity';

@Component({
  selector: 'app-feedback-card',
  standalone: false,
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.less'
})
export class FeedbackCardComponent {
  isCardOpen = false;

  @Input() CompanyDetails: CompanyDetails | undefined;
  @Input() CodingRoundInfo: CodingRoundInfo | undefined;
  @Input() TechnicalRound: TechnicalRound | undefined;
  @Input() HRRound: HRRound | undefined;
  @Input() Resources: Resources[] | undefined;

  // Compact card data
  companyName = "Google";
  jobProfile = "SDE";
  numRounds = 3;
  jobType = "Full-Time";
  ctc = "₹20 LPA";
  workMode = "Hybrid";
  location = "Bangalore";

  // Expanded card data
  codingPlatform = "HackerRank";
  codingDuration = "90 minutes";
  codingQuestions = "3 (DSA + Problem Solving)";
  codingDifficulty = "Medium";
  interviewMode = "Online";
  technicalInfo = "Focused on DSA, OOPs, and system design basics.";
  hrInfo = "General HR questions, company culture, salary negotiation.";
  resources = "LeetCode, GeeksforGeeks, System Design Primer";

  openCard(): void {
    this.isCardOpen = true;
  }

  closeCard(): void {
    this.isCardOpen = false;
  }
}

