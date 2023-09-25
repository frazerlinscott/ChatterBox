import { Component, OnInit } from '@angular/core';
//import { UserDataService } from 'src/app/service/user-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  // superAdmin: number;
  // Admin: number;
  // User: number;
  selectedUser: any;
  selectedRole: number | undefined;

  loggedInUser : any;

  isUser: boolean = true;
  isAdmin: boolean = true;
  isSuperAdmin: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    

    // const storedUser = window.sessionStorage.getItem('current.user');
    // if (storedUser) {
    //   this.loggedInUser = JSON.parse(storedUser);
    //   console.log(this.loggedInUser.role)
    //   // this.loggedInUser.role=3
    // }


    this.loggedInUser = {
      username: "super",
      birthdate: "2023-05-11",
      age: 0,
      email: "superEmail",
      password: "123",
      pwdconfirm: "123",
      role: 3,
      group: [],
      valid: true
    }
  
    // this.loggedInUser = {
    //   username: "admin",
    //   birthdate: "2023-05-11",
    //   age: 0,
    //   email: "superEmail",
    //   password: "123",
    //   pwdconfirm: "123",
    //   role: 2,
    //   group: [],
    //   valid: true
    // }
  
    // this.loggedInUser = {
    //   username: "user",
    //   birthdate: "2023-05-11",
    //   age: 0,
    //   email: "superEmail",
    //   password: "123",
    //   pwdconfirm: "123",
    //   role: 1,
    //   group: [],
    //   valid: true
    // }
  
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
  

    this.getUsers()
  }


  getRoleName(roleNumber: number): string {
    switch (roleNumber) {
      case 1:
        return 'User';
      case 2:
        return 'Admin';
      case 3:
        return 'Super Admin';
      default:
        return 'Unknown Role';
    }
  }


  openEditModal(user: any) {
    this.selectedUser = user;
    //console.log(this.selectedUser)
    this.selectedRole = user.role;
    $('#editUserRoleModal').modal('show');
  }

  updateUserRole() {
    // Convert to number and update the role
    this.selectedUser.role = Number(this.selectedRole);

    console.log(this.selectedUser)


    //--------------------------------------------------------------

    this.http.post(BACKEND_URL+"/update-permission", this.selectedUser).subscribe(
      response => {
          console.log('User details updated on the server.', response);
          //refesh User list 
          this.getUsers();
      },
      error => {
          console.error('There was an error updating the user details on the server.', error);
          alert('Error updating profile. Please try again.');
      }
  )
    //alert('Profile updated!');

  //-------------------------------------------------------------
    
    // Close the modal
    this.closeModal()
 
  }

  deleteUser(){
    this.selectedUser.valid = false

    //console.log(this.selectedUser)

    this.http.post(BACKEND_URL+"/update-permission", this.selectedUser).subscribe(
      response => {
          console.log('User details updated on the server.', response);

          //refesh User list 
          this.getUsers();
      },
      error => {
          console.error('There was an error updating the user details on the server.', error);
          alert('Error updating profile. Please try again.');
      }
  )
    this.closeModal()
  }


  closeModal(){
    $('#editUserRoleModal').modal('hide');
  }

  getUsers(){
    this.http.get(BACKEND_URL + "/all-users", httpOptions)
    .subscribe(
        (data: any) => {
            if (data) {

              //console.log(data)
              //this.users = data

              this.users = data.filter((user: { valid: boolean; }) => user.valid === true);


            } else {
                alert("no Data Soz");
            }
        },
        error => {console.error('There was an error:', error);}
    );
  }

}

