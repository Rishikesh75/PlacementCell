import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumniDetailsService {
  
  /*This url Has to be changed */
  private apiUrl = 'https://your-server-url.com/api/alumni'; // Replace with your server URL

  constructor(private http: HttpClient) { }

   sendAlumniDetails(data: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      name: data.name,
      email: data.contactName,
      interviewExperience: data.interviewExperience,
      linkdinProfile: data.linkedInProfile,
    };

    return this.http.post(this.apiUrl, body, { 
      headers, 
      observe: 'response' 
    });
  }

  getAlumniDetails(): Observable<HttpResponse<any>> {
    return this.http.get(this.apiUrl, { observe: 'response' });
  }
  //This is How we subscribe to the response
//   this.alumniService.getAlumniDetails().subscribe(response => {
//   const responseBody = response.body;
//   const headers = response.headers;
//   // Access specific header
//   const contentType = headers.get('content-type');
// });
}
