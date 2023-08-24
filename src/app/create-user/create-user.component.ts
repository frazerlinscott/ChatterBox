import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'server/routes/userModel';

const BACKEND_URL = "http://localhost:3000";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  // user = {
  //   username: "",
  //   email: "",
  //   password: "",
  //   password2: "",
  //   birthday: "'",
  //   age: "",
  //   roles: [1], // default values
  //   groups: [1] // default values
  // };

  user: User = new User('', '', 0, '', '', '', 1, 1, true);

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  onCreate() {
    if (this.user.password !== this.user.pwdconfirm) {
      alert('Passwords do not match!');  // Notify the user
      return;
    }

    

    const userToSend = { ...this.user };

    this.http.post(BACKEND_URL + "/create-user", userToSend, httpOptions).subscribe(
      (response: any) => {

        

        if (response && response.success) {

          // Save to session storage
          sessionStorage.setItem("username", userToSend.username);
          sessionStorage.setItem("email", userToSend.email);
          sessionStorage.setItem("birthday", userToSend.birthdate);

          this.router.navigateByUrl('login');
        } else {
          alert('Failed to create user.');
        }
      },
      error => {
        console.error('There was an error during user creation:', error);
      if (error && error.error && error.error.message) {
        console.error('Server response:', error.error.message);
      }
    }
    );
  }
}
