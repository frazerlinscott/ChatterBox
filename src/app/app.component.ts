import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'week4tut';
}

// import { Component, ViewChild, OnInit } from '@angular/core' 
// import { HttpClient, HttpHeaders } from '@angular/common/http'

// const httpOptions = {
//   headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
// }

// import { NgForm } from '@angular/forms'
// import { Userpwd } from "../userpwd"
// import { Userobj } from '../userobj'
// import {Router} from "@angular/router"

// import { USERPWDS} from "../mock-users"

// const BACKEND_URL = "http://localhost:3000"

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })

// export class LoginComponent implements OnInit {
//   userpwd: Userpwd = {username: "k.suggriffith.edu.au", pwd: "666666"};
//   userobj: Userobj ={userid: 1, username: this.userpwd.username, userbithdate: null, userage:100};

//   constructor(private router: Router, private http: HttpClient) { }

//   ngOnInit(){}

//     public loginfunc(){
//       this.httpClient.post(BACKEND_URL + "/login", this.userpwd, httpOptions)
//       .subscribe((data:any)=>{
//         alert(JSON.stringify(this.userpwd));
//         if(data.ok){
//           sessionStorage.setItem("userid", this.userobj.userid.toString());
//           sessionStorage.setItem("username", this.userobj.username);
//           sessionStorage.setItem("userbirthdate", this.userobj.userbirthday)
//           sessionStorage.setItem("userage", this.userobj.userage.toString());
//           this.httpClient.post<Userobj>(BACKEND_URL + "/loginAfter", this.userobj, httpOptions)
//           .subscribe((m:any)=> {console.log(m[0]);});
//           this.router.navigateByUrl('account');
//       } else{
//         alert("Sorry, username or password is incorrect")
//       }
//     })
//   }
// }



