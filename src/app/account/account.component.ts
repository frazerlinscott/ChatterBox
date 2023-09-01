import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { UserDataService } from 'src/app/service/user-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from 'server/routes/groupModel';
import { ChangeDetectorRef } from '@angular/core';

declare var $: any;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  username: string;
  birthdate: string;
  age: number;
  allGroups: any;
  loggedInUser: any;
  users: any;
  currentUser: any; 
  currentUserGroups: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.username = sessionStorage.getItem('username') ?? '';
    this.birthdate = sessionStorage.getItem('userbirthdate') ?? '';
    this.age = Number(sessionStorage.getItem('userage') ?? '0');
}

ngOnInit(): void {
  this.getUsers()
  this.getGroups()

  const storedUser = window.sessionStorage.getItem('current.user');
  if (storedUser) {

    this.loggedInUser = JSON.parse(storedUser);
    //.log(this.loggedInUser)
  }
}

getGroups(){
  this.http.post(BACKEND_URL + "/all-groups", httpOptions)
  .subscribe(
      (data: any) => {
          if (data) {
            this.allGroups = data
            this.filterGroups(this.allGroups)
          } else {
              alert("no Data Soz");
          }
      },
      error => {console.error('There was an error:', error);}
  );
}

getUsers(){
  this.http.post(BACKEND_URL + "/all-users", httpOptions)
  .subscribe(
      (data: any) => {
          if (data) {
            this.users = data
            this.filterUser(this.users)
            //console.log(this.users)
          } else {
              alert("no Data Soz");
          }
      },
      error => {console.error('There was an error:', error);}
  );
}

filterGroups(group: any){

  

  const userGroupIds = this.currentUser.group; // Array of group IDs associated with the current user

  this.currentUserGroups = group.filter((g: { groupID: any; }) => userGroupIds.includes(g.groupID));

  // console.log('Matched Groups:', matchedGroups);


}

filterUser(users: any[]) {
  const matchedUser = users.find(u => u.username === this.loggedInUser.username);

  if (matchedUser) {
      this.currentUser = matchedUser;
      //console.log(this.currentUser)
      console.log('Match found and assigned to this.currentUser!');
  } else {
      console.log('No match found.');
  }
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
