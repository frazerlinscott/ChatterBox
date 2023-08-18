import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  user = {
    username: '',
    email: '',
    password: '',
    password2: '',
    birthday: '',
    roles: [1], // default values
    groups: [1] // default values
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  onCreate() {
    if (this.user.password !== this.user.password2) {
      alert('Passwords do not match!');  // Notify the user
      return;
    }

    // Removing the 'password2' field as we won't send it to the server
    const userToSend = { ...this.user };
    // delete userToSend.password2;

    // Now, send the user data to your backend
    this.http.post(BACKEND_URL + "/create-user", userToSend, httpOptions).subscribe(
      (response: any) => {
        // Assuming your backend returns { success: true } upon a successful addition
        if (response && response.success) {
          // Save to session storage
          sessionStorage.setItem("username", userToSend.username);
          sessionStorage.setItem("email", userToSend.email);
          sessionStorage.setItem("birthday", userToSend.birthday);

          // Navigate the user back to login
          this.router.navigateByUrl('login');
        } else {
          alert('Failed to create user.');
        }
      },
      error => {
        console.error('There was an error during user creation:', error);
      }
    );
  }
}
