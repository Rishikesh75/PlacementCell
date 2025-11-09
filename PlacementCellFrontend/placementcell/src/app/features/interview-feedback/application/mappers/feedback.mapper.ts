/**
 * Feedback Mapper
 * Maps between Domain Entities and DTOs
 */

import { Injectable } from '@angular/core';
import { 
  Feedback, 
  CompanyDetails, 
  CodingRound, 
  TechnicalRound, 
  HRRound, 
  Question,
  DSAQuestion,
  ComputerCoreQuestion,
  SystemDesignQuestion,
  PuzzleBasedQuestion,
  SituationBasedQuestion,
  UnexpectedQuestion,
  Resource
} from '../../domain/entities';
import { 
  FeedbackRequestDto, 
  FeedbackResponseDto,
  CompanyDetailsDto,
  CodingRoundInfoDto,
  TechnicalRoundDto,
  HRRoundDto,
  QuestionDto,
  DSAQuestionDto,
  ComputerCoreQuestionDto,
  SystemDesignQuestionDto,
  PuzzleBasedQuestionDto,
  SituationBasedQuestionDto,
  UnexpectedQuestionDto,
  ResourceDto
} from '../dtos';

@Injectable()
export class FeedbackMapper {
  /**
   * Map Domain Entity to Request DTO
   */
  toRequestDto(feedback: Feedback): FeedbackRequestDto {
    return {
      companydetails: this.companyDetailsToDto(feedback.companyDetails),
      codingroundinfo: this.codingRoundToDto(feedback.codingRound),
      TechnicalRound: this.technicalRoundToDto(feedback.technicalRound),
      HRRound: this.hrRoundToDto(feedback.hrRound),
      Resources: feedback.resources.map(r => this.resourceToDto(r))
    };
  }

  /**
   * Map Response DTO to Domain Entity
   */
  fromResponseDto(dto: FeedbackResponseDto): Feedback {
    return new Feedback(
      this.companyDetailsFromDto(dto.companydetails),
      this.codingRoundFromDto(dto.codingroundinfo),
      this.technicalRoundFromDto(dto.TechnicalRound),
      this.hrRoundFromDto(dto.HRRound),
      dto.Resources.map(r => this.resourceFromDto(r))
    );
  }

  // Private helper methods for mapping nested objects

  private companyDetailsToDto(entity: CompanyDetails): CompanyDetailsDto {
    return {
      companyName: entity.companyName,
      jobProfile: entity.jobProfile,
      numRounds: entity.numRounds,
      jobType: entity.jobType,
      ctc: entity.ctc,
      workMode: entity.workMode,
      location: entity.location
    };
  }

  private companyDetailsFromDto(dto: CompanyDetailsDto): CompanyDetails {
    return new CompanyDetails(
      dto.companyName,
      dto.jobProfile,
      dto.numRounds,
      dto.jobType,
      dto.ctc,
      dto.workMode,
      dto.location
    );
  }

  private codingRoundToDto(entity: CodingRound): CodingRoundInfoDto {
    return {
      codingPlatform: entity.codingPlatform,
      codingDuration: entity.codingDuration,
      codingQuestions: entity.codingQuestions.map(q => ({ question: q.question })),
      codingDifficulty: entity.codingDifficulty,
      interviewMode: entity.interviewMode
    };
  }

  private codingRoundFromDto(dto: CodingRoundInfoDto): CodingRound {
    return new CodingRound(
      dto.codingPlatform,
      dto.codingDuration,
      dto.codingQuestions.map(q => new Question(q.question)),
      dto.codingDifficulty,
      dto.interviewMode
    );
  }

  private technicalRoundToDto(entity: TechnicalRound): TechnicalRoundDto {
    return {
      Interviewmode: entity.interviewMode,
      Duration: entity.duration,
      DSAQuestion: entity.dsaQuestions.map(q => ({
        question: q.question,
        difficulty: q.difficulty,
        questionType: q.questionType
      })),
      ComputerCoreQuestion: entity.computerCoreQuestions.map(q => ({
        question: q.question,
        difficulty: q.difficulty,
        questionType: q.questionType
      })),
      SystemDesignQuestion: entity.systemDesignQuestions.map(q => ({
        question: q.question,
        difficulty: q.difficulty,
        questionType: q.questionType
      })),
      PuzzleBasedQuestion: entity.puzzleBasedQuestions.map(q => ({
        question: q.question,
        difficulty: q.difficulty
      }))
    };
  }

  private technicalRoundFromDto(dto: TechnicalRoundDto): TechnicalRound {
    return new TechnicalRound(
      dto.Interviewmode,
      dto.Duration,
      dto.DSAQuestion.map(q => new DSAQuestion(q.question, q.difficulty, q.questionType)),
      dto.ComputerCoreQuestion.map(q => new ComputerCoreQuestion(q.question, q.difficulty, q.questionType)),
      dto.SystemDesignQuestion.map(q => new SystemDesignQuestion(q.question, q.difficulty, q.questionType)),
      dto.PuzzleBasedQuestion.map(q => new PuzzleBasedQuestion(q.question, q.difficulty))
    );
  }

  private hrRoundToDto(entity: HRRound): HRRoundDto {
    return {
      SituationBasedQuestions: entity.situationBasedQuestions.map(q => ({ question: q.question })),
      UnexpectedQuestions: entity.unexpectedQuestions.map(q => ({ question: q.question }))
    };
  }

  private hrRoundFromDto(dto: HRRoundDto): HRRound {
    return new HRRound(
      dto.SituationBasedQuestions.map(q => new SituationBasedQuestion(q.question)),
      dto.UnexpectedQuestions.map(q => new UnexpectedQuestion(q.question))
    );
  }

  private resourceToDto(entity: Resource): ResourceDto {
    return {
      category: entity.category,
      Description: entity.description,
      Link: entity.link
    };
  }

  private resourceFromDto(dto: ResourceDto): Resource {
    return new Resource(dto.category, dto.Description, dto.Link);
  }
}

