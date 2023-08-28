import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  username: string;
  birthdate: string;
  age: number;

  constructor(private router: Router) { 
    this.username = sessionStorage.getItem('username') ?? '';
    this.birthdate = sessionStorage.getItem('userbirthdate') ?? '';
    this.age = Number(sessionStorage.getItem('userage') ?? '0');
}


  logout() {
    // Clear session storage
    sessionStorage.clear();
  
    // Redirect to login page
    this.router.navigateByUrl('/login');
  }

  openUsers() {
    // Redirect to users page
    this.router.navigateByUrl('/users');
  }
  openGroups() {
  
    // Redirect to groups page
    this.router.navigateByUrl('/groups');
  }
}
