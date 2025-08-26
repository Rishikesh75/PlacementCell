import { Component } from '@angular/core';
import {FeedbackcardSample} from '../models/feedbackcard.model';
@Component({
  selector: 'app-studentinterviewfeedback-display',
  standalone:false,
  templateUrl: './studentinterviewfeedback-display.html',
  styleUrl: './studentinterviewfeedback-display.less'
})
export class StudentinterviewfeedbackDisplay {
  FeedbackcardSample = FeedbackcardSample;
}
