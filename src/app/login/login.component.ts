

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

  userpwd={ username: "", password: "" };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {}

  public loginfunc() {
    this.http.post(BACKEND_URL + "/login", this.userpwd, httpOptions)
    .subscribe(
        (data: any) => {
            if (data.ok && data.user) {

                sessionStorage.setItem('current.user', JSON.stringify(data.user));
                
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