import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from './add-review.component';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import {AlumniDetailsService} from '../services/alumni-details.service';
@NgModule({
  declarations: [AddReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [AlumniDetailsService]
})
export class AddReviewModule { 
  constructor(private router:Router) {}
  onSubmit()
  {
    console.log("Feedback submitted");
    this.router.navigate(['/company-review-display']);
  }

}
