import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { UserDataService } from 'src/app/service/user-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Group } from 'server/routes/groupModel'


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
  selectedGroup: any;

  isUser: boolean = true;
  isAdmin: boolean = true;
  isSuperAdmin: boolean = true;
  profilePicPath: any;


  constructor(private http: HttpClient, private router: Router) { 
    this.username = sessionStorage.getItem('username') ?? '';
    this.birthdate = sessionStorage.getItem('userbirthdate') ?? '';
    this.age = Number(sessionStorage.getItem('userage') ?? '0');
}

ngOnInit(): void {
  this.getUsers()
  this.getGroups()




  
//----------------------------------------------------------------
//Actual Code
  const storedUser = window.sessionStorage.getItem('current.user');
  if (storedUser) {

    this.loggedInUser = JSON.parse(storedUser);
    //.log(this.loggedInUser)
  }
//----------------------------------------------------------------

  if (this.loggedInUser.role === 1){
    this.isUser = true
    this.isAdmin = false
    this.isSuperAdmin = false
  }else if (this.loggedInUser.role === 2){
    this.isUser = false
    this.isAdmin = true
    this.isSuperAdmin = false
  }else if (this.loggedInUser.role === 3){
    this.isUser = false
    this.isAdmin = false
    this.isSuperAdmin = true
  }
}
//----------------------------------------------------------------

getGroups(){
  this.http.get(BACKEND_URL + "/all-groups", httpOptions)
  .subscribe(
      (data: any) => {
          if (data) {
            this.allGroups = data
            this.allGroups = data.filter((group: { valid: boolean; }) => group.valid === true);
            this.filterGroups(this.allGroups)
          } else {
              alert("no Data Soz");
          }
      },
      error => {console.error('There was an error:', error);}
  );
}

getUsers(){
  this.http.get(BACKEND_URL + "/all-users", httpOptions)
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
  console.log(group)
  console.log(this.loggedInUser.username)
  this.currentUserGroups = group.filter((g: { members: string | any[]; }) => g.members.includes(this.loggedInUser.username));
}

filterUser(users: any[]) {
  const matchedUser = users.find(u => u.username === this.loggedInUser.username);

  if (matchedUser) {
      this.currentUser = matchedUser;

      this.profilePicPath=BACKEND_URL + "/" + this.currentUser.profilePic

      console.log(this.profilePicPath)

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

  onGroupCardClick(group:any ){
    this.selectedGroup = group;
    //console.log("card clicked")
    this.router.navigate(['/channels'], { queryParams: { yourKey: JSON.stringify(group) }})
  }
}
