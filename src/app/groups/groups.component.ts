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

  newGroupName: any;
  newChannelName: any;
  groupChannels: string[] = [];

  newGroupID: any;
  allGroupNames: any;
  isUniqueGroup:boolean = true;

  isUser: boolean = true;
  isAdmin: boolean = true;

  group: Group = new Group(0, " ", " ", [""], [""], [""], [""], true);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const storedUser = window.sessionStorage.getItem('current.user');
    if (storedUser) {

      this.loggedInUser = JSON.parse(storedUser);

      // console.log(this.loggedInUser.role)
      // console.log(this.loggedInUser)

      this.loggedInUser.role = 2

      if (this.loggedInUser.role === 1){
        this.isUser = true
        this.isAdmin = false
      }else{
        this.isUser = false
        this.isAdmin = true
      }
      // console.log("user:" + this.isUser)
      // console.log("admin:" + this.isAdmin)
    }

    this.getUsers()
    this.getGroups()

    this.http.get<string[]>(BACKEND_URL + "/groups").subscribe(groupsNames => {
      this.allGroupNames = groupsNames;
      console.log(this.allGroupNames);
    });
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

    $('#addGroupModal').modal('show');
  }

  onGroupInput() {
    
    this.isUniqueGroup = !this.allGroupNames.includes(this.newGroupName);
    console.log(this.isUniqueGroup)
  }

  addChannel() {
    if (this.newChannelName && !this.groupChannels.includes(this.newChannelName)) {
      this.groupChannels.push(this.newChannelName);
      this.newChannelName = '';
    }
  }

  saveGroup(){
    //console.log(this.newGroupName)
   // console.log(this.groupChannels)

    this.GetNewGroupID()

    //console.log(this.newGroupID)

    if (this.isUniqueGroup === true){
      this.group.groupID = this.newGroupID;
      this.group.groupName = this.newGroupName;
      this.group.createdBy = this.loggedInUser.username;
      this.group.groupAdmins = [this.loggedInUser.username];
      this.group.userRequests = [""];
      this.group.members = [""];
      this.group.channels = this.groupChannels;
      this.group.valid = true;
  
      //console.log(this.group)
  
      this.http.post(BACKEND_URL+"/update-groups", this.group).subscribe(
        response => {
            console.log('User details updated on the server.', response);
  
            //refesh User list 
            this.getGroups();
        },
        error => {
            console.error('There was an error updating the user details on the server.', error);
            alert('Error updating profile. Please try again.');
        }
      )
      this.closeModal()
    }else{
      alert("Group already exists");
    }
  }

  closeModal(){

    this.group = {
      groupID: 0,
      groupName: "",
      createdBy: this.loggedInUser.username,
      groupAdmins: [""],
      userRequests: [""],
      members: [""],
      channels: [""],
      valid: true
  };

  this.newGroupName=''

  this.groupChannels=[]

  console.log(this.group)

  
    $('#addGroupModal').modal('hide');
  }
  
  getUsers(){
    this.http.post(BACKEND_URL + "/all-users", httpOptions)
    .subscribe(
        (data: any) => {
            if (data) {
              this.users = data
              //console.log(this.users)
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
              //console.log(this.groups)

              //console.log(typeof(this.groups))
            } else {
                alert("no Data Soz");
            }
        },
        error => {console.error('There was an error:', error);}
    );
  }

  GetNewGroupID(){
    if (this.groups && this.groups.length > 0) {
      this.newGroupID = this.groups[this.groups.length - 1].groupID + 1;
  } else {
      this.newGroupID = 1;
  }
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

