
/*
export interface Student {
    rollNo:string;
    name: string;
    contactNo: number;
    linkdIn: string;
    interviewExperience:string;
  }
*/
import { Component } from '@angular/core';
import {Student}from './student-info-interface.componet'
@Component({
  selector: 'app-student-info',
  standalone:false,
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.less'
})

export class StudentInfoComponent {
  /*
  student : Student = {
    id: 1,
    name: 'John Doe',
    age: 20,
    grade: 'A',
    address: '123 Main St, Cityville'
  }*/
  public student: Student = {
    rollNo: '12345',
    name: 'John Doe',
    contactNo: 9876543210,
    linkdIn: 'https://www.linkedin.com/in/johndoe',
    interviewExperience: 'Had a great experience during the interview process.'
  };
  editMode: boolean = false;
  deleteMode:boolean = false;
  onTextChange(updatedText: string) {
    console.log("Updated Text:", updatedText);
  }
  Edittext()
  {
    this.editMode = !this.editMode;
    console.log("Edit Text");
  }
  DeleteText()
  {
    this.deleteMode = !this.deleteMode;
    console.log("Delete Text");
  }
}
