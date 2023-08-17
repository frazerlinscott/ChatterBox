import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <-- Import Router here

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };

  users = [
    {email: 'michael@com.au', password: '123'},
    {email: 'beyonce@com.au', password: '456'},
    {email: 'post@com.au', password: '789'}
  ];


  errorMessage = '';

  constructor(private router: Router) { }

  onSubmit() {
    const validUser = this.users.find(u => u.email === this.user.email && u.password === this.user.password);
    if (validUser) {
      this.router.navigate(['/account']);
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
