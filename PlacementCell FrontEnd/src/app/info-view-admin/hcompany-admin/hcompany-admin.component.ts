import { Component } from '@angular/core';

@Component({
  selector: 'app-hcompany-admin',
  standalone:false,
  templateUrl: './hcompany-admin.component.html',
  styleUrl: './hcompany-admin.component.less'
})
export class HcompanyAdminComponent {
  editMode: boolean = true; // Edit mode toggle
  // Company details (editable)
  company = {
    name: "Company Name",
    offers: 120,
    industry: "IT Services",
    location: "Bangalore, India",
    logo: "company-logo.png"
  };
  constructor() {}
  // Change the company logo
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.company.logo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
