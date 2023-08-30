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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post(BACKEND_URL + "/all-users", httpOptions)
    .subscribe(
        (data: any) => {
            if (data) {

              console.log(data)
              this.users = data


            } else {
                alert("no Data Soz");
            }
        },
        error => {console.error('There was an error:', error);}
    );
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
    console.log(this.selectedUser)
    this.selectedRole = user.role;
    $('#editUserRoleModal').modal('show');
  }

  updateUserRole() {
    // Convert to number and update the role
    this.selectedUser.role = Number(this.selectedRole);
    
    // Close the modal
    $('#editUserRoleModal').modal('hide');
  }

}

