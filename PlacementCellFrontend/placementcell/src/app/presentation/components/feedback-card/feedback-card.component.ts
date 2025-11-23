import { Component, Input } from '@angular/core';
import { 
  CompanyDetailsDto, 
  CodingRoundInfoDto, 
  TechnicalRoundDto, 
  HRRoundDto, 
  ResourceDto 
} from '../../../application/dtos';

@Component({
  selector: 'app-feedback-card',
  standalone: false,
  templateUrl: './feedback-card.component.html',
  styleUrl: '../../../styles/components/feedback-card.less'
})
export class FeedbackCardComponent {
  isCardOpen = false;

  @Input() CompanyDetails: CompanyDetailsDto | undefined;
  @Input() CodingRoundInfo: CodingRoundInfoDto | undefined;
  @Input() TechnicalRound: TechnicalRoundDto | undefined;
  @Input() HRRound: HRRoundDto | undefined;
  @Input() Resources: ResourceDto[] | undefined;

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

