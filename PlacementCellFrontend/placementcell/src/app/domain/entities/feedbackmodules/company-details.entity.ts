/**
 * Company Details Entity
 * Represents company and job information
 */

export class CompanyDetails {
  constructor(
    public companyName: string = '',
    public jobProfile: string = '',
    public numRounds: number = 0,
    public jobType: string = '',
    public ctc: number | string = 6,
    public workMode: string = '',
    public location: string = ''
  ) {}

  /**
   * Validate if company details are complete
   */
  isValid(): boolean {
    return (
      this.companyName.trim() !== '' &&
      this.jobProfile.trim() !== '' &&
      this.numRounds > 0 &&
      this.jobType.trim() !== '' &&
      this.workMode.trim() !== '' &&
      this.location.trim() !== ''
    );
  }

  /**
   * Get formatted CTC string
   */
  getFormattedCtc(): string {
    if (typeof this.ctc === 'number') {
      return `${this.ctc} LPA`;
    }
    return this.ctc;
  }
}

