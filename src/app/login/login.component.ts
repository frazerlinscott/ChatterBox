import { Component, OnInit } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userpwd={ username: "", pwd: "" };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {}

  public loginfunc() {
    this.http.post(BACKEND_URL + "/login", this.userpwd, httpOptions)
    .subscribe(
        (data: any) => {
            if (data.ok && data.user) {
                // // Save all the necessary user data to the session storage
                // sessionStorage.setItem("userid", "1"); // Just a placeholder, ideally you would get this from the server.
                // sessionStorage.setItem("username", data.user.username);
                // sessionStorage.setItem("userbirthdate", data.user.birthday || "1997-02-18");
                // sessionStorage.setItem("userage", data.user.age);
                
                // // Navigate to account page after successful login
                this.router.navigateByUrl('account');
            } else {
                alert("Sorry, username or password is incorrect");
            }
        },
        error => {console.error('There was an error:', error);}
    );
  }

  public creatfunc(){
    this.router.navigateByUrl('create-user');
  }
}
