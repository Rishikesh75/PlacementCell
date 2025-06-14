import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor() { }
  private isadmin:boolean=false;
  setAdmin(){
    this.isadmin=true;
  }
  getAdmin(){
    return this.isadmin;
  }
}
