import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private  BACKEND_URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  uploadFile(data: FormData) {

    console.log("uploadFile: " + JSON.stringify(data));
    console.log("hit")
    console.log(this.BACKEND_URL)

    return this.http.post(this.BACKEND_URL+"/uploadPhoto", data);


    // return this.http.post(this.BACKEND_URL + "/uploadPhoto", data);
  }

//   testEndpoint() {
//     return this.http.post(this.BACKEND_URL + "/testEndpoint", {});
// }
}
