import { Component, OnInit } from '@angular/core';
//import { UserDataService } from 'src/app/service/user-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from 'server/routes/groupModel';

declare var $: any;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = "http://localhost:3000";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  loggedInUser : any;
  users: any;
  groups: any;
  selectedGroup: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const storedUser = window.sessionStorage.getItem('current.user');
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser);
      console.log(this.loggedInUser)
    }
    this.getUsers()
    this.getGroups()
  }

  onGroupCardClick(group:any ){
    
    this.selectedGroup = group;
    console.log("card clicked")

    console.log(group)
  }

  onButton1Click(group:any){
    console.log("Button 1 clicked")
  }

  onButton2Click(group:any){
    console.log("Button 2 clicked")

  }

  onAddGroup() {
    console.log("Add Group button clicked");
    // Handle the Add Group action here
  }
  






  getUsers(){
    this.http.post(BACKEND_URL + "/all-users", httpOptions)
    .subscribe(
        (data: any) => {
            if (data) {
              this.users = data
              console.log(this.users)
            } else {
                alert("no Data Soz");
            }
        },
        error => {console.error('There was an error:', error);}
    );
  }


  getGroups(){
    this.http.post(BACKEND_URL + "/all-groups", httpOptions)
    .subscribe(
        (data: any) => {
            if (data) {
              this.groups = data
              console.log(this.groups)
              console.log(typeof(this.groups))
            } else {
                alert("no Data Soz");
            }
        },
        error => {console.error('There was an error:', error);}
    );
  }















  // getRoleName(roleNumber: number): string {
  //   switch (roleNumber) {
  //     case 1:
  //       return 'User';
  //     case 2:
  //       return 'Admin';
  //     case 3:
  //       return 'Super Admin';
  //     default:
  //       return 'Unknown Role';
  //   }
  // }


  // openEditModal(user: any) {
  //   this.selectedUser = user;
  //   //console.log(this.selectedUser)
  //   this.selectedRole = user.role;
  //   $('#editUserRoleModal').modal('show');
  // }

  // updateUserRole() {
  //   // Convert to number and update the role
  //   this.selectedUser.role = Number(this.selectedRole);

  //   console.log(this.selectedUser)


  //   //--------------------------------------------------------------

  //   this.http.post(BACKEND_URL+"/update-permission", this.selectedUser).subscribe(
  //     response => {
  //         console.log('User details updated on the server.', response);
  //         //refesh User list 
  //         this.getUsers();
  //     },
  //     error => {
  //         console.error('There was an error updating the user details on the server.', error);
  //         alert('Error updating profile. Please try again.');
  //     }
  // )
    //alert('Profile updated!');

  //-------------------------------------------------------------
    
  //   // Close the modal
  //   this.closeModal()
 
  // }



  // closeModal(){
  //   $('#editUserRoleModal').modal('hide');
  // }



}

