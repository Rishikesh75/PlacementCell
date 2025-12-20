import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class FeedbackCardComponent implements OnChanges {
  isCardOpen = false;

  // Inputs from API
  @Input() feedbackId: string | undefined;
  @Input() companyId: string | undefined;
  @Input() alumniId: string | undefined;
  @Input() CompanyDetails: CompanyDetailsDto | undefined;
  @Input() CodingRoundInfo: CodingRoundInfoDto | undefined;
  @Input() TechnicalRound: TechnicalRoundDto | undefined;
  @Input() HRRound: HRRoundDto | undefined;
  @Input() Resources: ResourceDto[] | undefined;

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

