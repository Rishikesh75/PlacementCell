/**
 * Main Feedback Entity
 * Represents a complete interview feedback submission
 */

import { CompanyDetails } from './company-details.entity';
import { CodingRound } from './coding-round.entity';
import { TechnicalRound } from './technical-round.entity';
import { HRRound } from './hr-round.entity';
import { Resource } from './resource.entity';

export class Feedback {
  constructor(
    public companyDetails: CompanyDetails,
    public codingRound: CodingRound,
    public technicalRound: TechnicalRound,
    public hrRound: HRRound,
    public resources: Resource[]
  ) {}

  /**
   * Validate if the feedback is complete
   */
  isValid(): boolean {
    return (
      this.companyDetails.isValid() &&
      this.codingRound.isValid() &&
      this.technicalRound.isValid() &&
      this.hrRound.isValid()
    );
  }

  /**
   * Get the total number of interview rounds
   */
  getTotalRounds(): number {
    return this.companyDetails.numRounds;
  }
}

