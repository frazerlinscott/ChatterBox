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
  allUsernames: string[] = [];
  isUniqueUsername: boolean = true;
  isUniqueEmail:boolean = true;
  isUniquePassword: boolean = true;
  
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {

    const storedUserData = sessionStorage.getItem('current.user');

    this.http.get<string[]>(BACKEND_URL + "/usernames").subscribe(usernames => {
      this.allUsernames = usernames;
      console.log(this.allUsernames);
    });


    if (storedUserData) {
        const retrievedUser = JSON.parse(storedUserData);

        console.log(retrievedUser)

        this.user.username = retrievedUser.username;
        this.user.userbirthdate = retrievedUser.birthdate
        this.user.email = retrievedUser.email
        this.user.password=retrievedUser.password
        this.user.pwdconfirm=retrievedUser.pwdconfirm
      }
}

  onUsernameInput() {
  // Check if username is unique while the user is typing
    this.isUniqueUsername = !this.allUsernames.includes(this.user.username);
    console.log(this.isUniqueUsername)
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
        retrievedUser.email = this.user.email;
        retrievedUser.password = this.user.password
        retrievedUser.pwdconfirm = this.user.pwdconfirm

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
          this.isUniqueEmail=false
      },
      error => {
          console.error('There was an error updating the user details on the server.', error);
          alert('Error updating profile. Please try again.');
          this.isUniqueEmail=false
      }
  )
    alert('Profile updated!');
    this.router.navigateByUrl('/account'); // Assuming '/account' is your account page route
  }

  closeProfile() {
    this.router.navigateByUrl('/account'); // Assuming '/account' is your account page route
  }

  deleteProfile(){

    this.user.valid = false

    this.http.post(BACKEND_URL+"/update-permission", this.user).subscribe(
      response => {
          console.log('User details updated on the server.', response);
          //refesh User list 
      },
      error => {
          console.error('There was an error updating the user details on the server.', error);
          alert('Error updating profile. Please try again.');
      }
    )
    this.router.navigateByUrl('login');
  }
  

  

  
}
