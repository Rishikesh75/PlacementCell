import { Injectable } from '@angular/core';
import { FeedbackCardData } from '../../domain/entities/feedback.entity';
import { FeedbackFormDTO } from '../dtos/feedback-form.dto';

@Injectable({
  providedIn: 'root'
})
export class FeedbackMapper {
  /**
   * Maps DTO to Domain Entity
   */
  toDomain(dto: FeedbackFormDTO): FeedbackCardData {
    return {
      companydetails: dto.companydetails,
      codingroundinfo: dto.codingroundinfo,
      TechnicalRound: dto.TechnicalRound,
      HRRound: dto.HRRound,
      Resources: dto.Resources
    };
  }

  /**
   * Maps Domain Entity to DTO
   */
  toDTO(entity: FeedbackCardData): FeedbackFormDTO {
    return {
      companydetails: entity.companydetails,
      codingroundinfo: entity.codingroundinfo,
      TechnicalRound: entity.TechnicalRound,
      HRRound: entity.HRRound,
      Resources: entity.Resources
    };
  }
}

