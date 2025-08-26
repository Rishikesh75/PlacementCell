import { Component, Input } from '@angular/core';
import {feedbackcarddata} from '../models/feedbackcard.model';
import {FeedbackcardSample} from '../models/feedbackcard.model';
import {CompanyDetails,CodingRoundInfo,TechnicalRound,HRRound,Resources} from '../models/feedbackcard.model';
@Component({
  selector: 'app-feedbackcard',
  standalone:false,
  templateUrl: './feedbackcard.html',
  styleUrl: './feedbackcard.less'
})
export class Feedbackcard {

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

openCard() {
  this.isCardOpen = true;
}

closeCard() {
  this.isCardOpen = false;
}

}
