import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'server/routes/userModel';
import { UploadService } from '../service/upload.service';

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

  user: User = new User('', '', 0, '', '', '', 1, [], true, '');

  allUsernames: string[] = [];
  isUniqueUsername: boolean = true;
  isUniquePassword: boolean = true;
  isUniqueEmail:boolean = true;
  selectedFile: File | null = null;


  constructor(private router: Router, private http: HttpClient, private uploadService: UploadService) {}

  ngOnInit(): void {
    this.isUniqueEmail=true; 
    this.http.get<string[]>(BACKEND_URL + "/usernames").subscribe(usernames => {
      this.allUsernames = usernames;
      console.log(this.allUsernames);
    });
  }

  onUsernameInput() {
    // Check if username is unique while the user is typing
    this.isUniqueUsername = !this.allUsernames.includes(this.user.username);
  }

  onCreate() {
    if (this.user.password !== this.user.pwdconfirm) {
      //alert('Passwords do not match!');  // Notify the user
      this.isUniquePassword=false; 
      return;
    }

    const userToSend = { ...this.user };

    this.http.post(BACKEND_URL + "/addUser", userToSend, httpOptions).subscribe(
      (response: any) => {
        if (response && response.success) {
          this.onUpload(userToSend.username)
          this.router.navigateByUrl('login');
        } else {
          alert("Email already exists!");
        }
      },
      error => {
        console.error('There was an error during user creation:', error);
      if (error && error.error && error.error.message) {
        console.error('Server response:', error.error.message);
        //this.isUniqueEmail=false
      }
    }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(username : string) {
    const formData = new FormData();

    if (this.selectedFile) {
      console.log(username)
      formData.append('photo', this.selectedFile);
      formData.append('username', username); 
      console.log("username sent")

    //   this.uploadService.testEndpoint().subscribe(response => {
    //     console.log('Response from test endpoint:', response);
    // }, error => {
    //     console.error('Error hitting test endpoint:', error);
    // });


      this.uploadService.uploadFile(formData).subscribe(response => {
        console.log('Upload successful', response);
        // Perhaps do something here after successful upload
      }, error => {
        console.error('Upload error', error);
        // Handle upload errors
      });

    }
  }

}