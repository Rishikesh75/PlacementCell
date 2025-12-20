import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { 
  CompanyDetails,
  CodingRound,
  TechnicalRound,
  HRRound,
  Resource
} from '../../../domain/entities';

@Component({
  selector: 'app-feedback-card',
  standalone: false,
  templateUrl: './feedback-card.component.html',
  styleUrl: '../../../styles/components/feedback-card.less'
})
export class FeedbackCardComponent implements OnChanges {
  isCardOpen = false;

  // Inputs from domain entities
  @Input() feedbackId: string | undefined;
  @Input() companyId: string | undefined;
  @Input() alumniId: string | undefined;
  @Input() CompanyDetails: CompanyDetails | undefined;
  @Input() CodingRoundInfo: CodingRound | undefined;
  @Input() TechnicalRound: TechnicalRound | undefined;
  @Input() HRRound: HRRound | undefined;
  @Input() Resources: Resource[] | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    // The input properties are already bound to the template
    // No need to maintain separate local variables anymore
    // The template will directly use CompanyDetails, CodingRoundInfo, etc.
  }

  openCard(): void {
    this.isCardOpen = true;
  }

  closeCard(): void {
    this.isCardOpen = false;
  }
}

