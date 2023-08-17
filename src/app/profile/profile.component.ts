import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.user.username = sessionStorage.getItem('username');
    this.user.userbirthdate = sessionStorage.getItem('userbirthdate');
    this.user.userage = parseInt(sessionStorage.getItem('userage') || '0');
    // ... and so on for other data
  }

  onSubmit() {
    sessionStorage.setItem('username', this.user.username);
    sessionStorage.setItem('userbirthdate', this.user.userbirthdate);
    sessionStorage.setItem('userage', this.user.userage.toString());
    // ... save other data
  
    alert('Profile updated!');
  }

  closeProfile() {
    this.router.navigateByUrl('/account'); // Assuming '/account' is your account page route
  }

  

  
}
