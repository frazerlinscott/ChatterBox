import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private BACKEND_URL = "http://localhost:3000"; // replace with your backend endpoint

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    // If you have to send some data with the POST request (like authentication info), add it as the second parameter
    return this.http.post<any>(this.BACKEND_URL+ "/all-users", {});
  }
}
