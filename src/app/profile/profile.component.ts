import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'server/routes/userModel';

const BACKEND_URL = "http://localhost:3000";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  
  constructor(private router: Router, private http: HttpClient) { }

  
  ngOnInit() {

    const storedUserData = sessionStorage.getItem('current.user');

    if (storedUserData) {
        const retrievedUser = JSON.parse(storedUserData);

        console.log(retrievedUser)

        this.user.username = retrievedUser.username;
        this.user.userbirthdate = retrievedUser.birthdate
        this.user.email = retrievedUser.email

      }
}

  onSubmit() {

    const storedUserData = sessionStorage.getItem('current.user');
    let originalUsername;

    if (storedUserData) {
        let retrievedUser = JSON.parse(storedUserData);
        originalUsername = retrievedUser.username;


        retrievedUser.username = this.user.username;
        retrievedUser.birthdate = this.user.userbirthdate;
        retrievedUser.email = this.user.email;

        // Update session storage with the new user data
        sessionStorage.setItem('current.user', JSON.stringify(retrievedUser));
    }

    const newDetails = {
      originalUsername: originalUsername,  // Send original username
      updatedDetails: this.user  // Send updated user details
  };

  console.log(newDetails);

    this.http.post(BACKEND_URL+"/update-user", newDetails).subscribe(
      response => {
          console.log('User details updated on the server.', response);
          alert('Profile updated!');
      },
      error => {
          console.error('There was an error updating the user details on the server.', error);
          alert('Error updating profile. Please try again.');
      }
  )
    alert('Profile updated!');
  }

  closeProfile() {
    this.router.navigateByUrl('/account'); // Assuming '/account' is your account page route
  }

  

  
}
