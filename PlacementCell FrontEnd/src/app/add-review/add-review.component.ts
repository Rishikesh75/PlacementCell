import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from './Alumini_data';
import {AlumniDetailsService} from '../services/alumni-details.service';
@Component({
  selector: 'app-add-review',
  standalone:false,
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.less']
})
export class AddReviewComponent {
  
  public employeeData: Employee = {
    name: '',
    contact: '',
    linkedin: '',
    experience: '',
  };

  constructor(private router: Router,private alumnidetailservice:AlumniDetailsService) {}


  public onSubmit() {
    console.log('Employee Data:', this.employeeData);
    this.alumnidetailservice.sendAlumniDetails(this.employeeData);
    alert('Feedback submitted successfully!');
    this.router.navigate(['/student']);
  }
}
