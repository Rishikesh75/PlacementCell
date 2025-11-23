import { Component, EventEmitter, Input, OnChanges, OnInit, Output, output, resource, SimpleChanges } from '@angular/core';
import { DSAQuestionType, CoreCSquestionType, ResourceCategory } from '../../../domain/value-objects/feedback-sample.value-object';
@Component({
  selector: 'app-greybox',
  standalone: false,
  templateUrl: './greybox.html',
  styleUrl: '../../../styles/components/greybox.less'
})
export class Greybox implements OnInit, OnChanges {
@Input() section: string = '';
  @Output() CodingQuestion = new EventEmitter<[any[], any]>();

  dsaquestiontype = DSAQuestionType;
  corecsquestiontype = CoreCSquestionType;
  resourceCategory = ResourceCategory;

  inputBoxCount: number = 1;   
  inputBoxes: any[] = [];      

  constructor() {}

  ngOnInit(): void {
    this.initializeBoxes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['section']) {
      this.initializeBoxes();
    }
  }

  private initializeBoxes(): void {
    console.log(`Section: ${this.section}`);
    if (this.section === 'CodingQuestion') {
      this.inputBoxes = Array(this.inputBoxCount).fill(null).map((_, idx) => ({
        id: idx,
        value: '',
        isDone: false
      }));
    } 
    else if (this.section === 'DSAQuestions' || this.section === 'DBMSQuestions') {
       this.inputBoxes = Array(this.inputBoxCount).fill(null).map((_, idx) => ({
        id: idx,
        QuestionType: '',
        DifficultyLevel: '',
        Question: '',
        isDone: false
      }));
    }
    else if(this.section === 'SystemDesign')
    {
      this.inputBoxes = Array(this.inputBoxCount).fill(null).map((_, idx) => ({
        id: idx,
        QuestionType: '',
        Question: '',
        isDone: false
      }));
    }
    else if(this.section === "PuzzleBasedQuestions")
    {
      this.inputBoxes = Array(this.inputBoxCount).fill(null).map((_, idx) => ({
        id: idx,
        DifficultyLevel: '',
        Question: '',
        isDone: false
      }));
    }
    else if(this.section === "SituationBasedQuestions" || this.section === "UnexpectedQuestions")
    {
      this.inputBoxes = Array(this.inputBoxCount).fill(null).map((_, idx) => ({
        id: idx,
        Question: '',
        Answer: '',
        isDone: false
      }));
    }
    else if(this.section === "Resources")
    {
      this.inputBoxes = Array(this.inputBoxCount).fill(null).map((_, idx) => ({
        id: idx,
        ResourceType: '',
        Url: '',
        Description: '',
        isDone: false
      }));
    }
  }

  // Add new box depending on section
  onAddClick(): void {
    if (this.section === 'CodingQuestion') {
      this.inputBoxes.push({
        id: this.inputBoxCount,
        value: '',
        isDone: false
      });
    } else if (this.section === 'DSAQuestions' || this.section === 'DBMSQuestions') {
      this.inputBoxes.push({
        id: this.inputBoxCount,
        QuestionType: '',
        DifficultyLevel: '',
        Question: '',
        isDone: false
      });
    } else if (this.section === 'SystemDesign') {
      this.inputBoxes.push({
        id: this.inputBoxCount,
        QuestionType: '',
        Question: '',
        isDone: false
      });
    } else if (this.section === 'PuzzleBasedQuestions') {
      this.inputBoxes.push({
        id: this.inputBoxCount,
        DifficultyLevel: '',
        Question: '',
        isDone: false
      });
    } else if (this.section === 'SituationBasedQuestions' || this.section === 'UnexpectedQuestions') {
      this.inputBoxes.push({
        id: this.inputBoxCount,
        Question: '',
        Answer: '',
        isDone: false
      });
    } else if (this.section === 'Resources') {
      this.inputBoxes.push({
        id: this.inputBoxCount,
        ResourceType: '',
        Url: '',
        Description: '',
        isDone: false
      });
    }
    this.inputBoxCount++;
  }

  onTextSubmitted(value: string, idx?: number): void {
    if (this.section === 'CodingQuestion' && this.inputBoxes.length > 0) {
      if (typeof idx === 'number') {
        this.inputBoxes[idx].value = value;
      } else {
        this.inputBoxes[this.inputBoxes.length - 1].value = value;
      }
    }
    else if(this.section === 'PuzzleBasedQuestions')
    {
      if (typeof idx === 'number') {
        this.inputBoxes[idx].Question = value;
      } else {
        this.inputBoxes[this.inputBoxes.length - 1].Question = value;
      }
    }
    else if(this.section === "SystemDesign")
    {
      if (typeof idx === 'number') {
        this.inputBoxes[idx].Question = value;
      } else {
        this.inputBoxes[this.inputBoxes.length - 1].Question = value;
      }
    }
    else if(this.section === "DSAQuestions" || this.section === "DBMSQuestions")
    {
      if (typeof idx === 'number') {
        console.log(`DSA/DBMS Question:GreyBox`);
        this.inputBoxes[idx].Question = value;
      } else {
        this.inputBoxes[this.inputBoxes.length - 1].Question = value;
      }
    }
  }
  handleJobProfileChange(values: any, idx: number): void {
    this.inputBoxes[idx].DifficultyLevel = values;
  }

  SystemDesignQuestionsType(event: any, idx: number): void {
    this.inputBoxes[idx].QuestionType = event;
  }
  // Delete specific box
  onDeleteClick(idx: number): void {
    if (idx >= 0 && idx < this.inputBoxes.length) {
      this.inputBoxes.splice(idx, 1);
      console.log(`Box ${idx} deleted`, this.inputBoxes);
    }
  }

  onDone(idx: number): void {
    this.CodingQuestion.emit([this.inputBoxes,this.section]);
  }

  onCoreCSquestionType(selected: string, idx: number): void {
    this.inputBoxes[idx].QuestionType = selected;
  }


  /*Unexpected Question */
  onQuestion(question: string,idx: number): void {
    this.inputBoxes[idx].Question = question;
  }

  onAnswer(answer: string,idx: number): void {
    this.inputBoxes[idx].Answer = answer;
  }

  /* Resource Section */
  onResourceType(selected: string, idx: number): void {
    this.inputBoxes[idx].ResourceType = selected;
  }

  onResourceLink(link: string, idx: number): void {
    this.inputBoxes[idx].Url = link;
  }

  onResourceDescription(description: string, idx: number): void {
    this.inputBoxes[idx].Description = description;
  }


  }
