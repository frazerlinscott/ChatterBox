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
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  loggedInUser : any;
  users: any;
  groups: any[] = [];
  allGroups: any;
  superGroups: any[] = [];

  clickedGroups: any[] = [];


  groupsNeedApproval: any;
  groupsAdminNeedApproval:any;

  selectedGroup: any;

  newGroupName: any;
  newChannelName: any;
  groupChannels: string[] = [];

  newGroupID: any;
  allGroupNames: any;
  isUniqueGroup:boolean = true;

  isUser: boolean = true;
  isAdmin: boolean = true;
  isSuperAdmin: boolean = true;

  noRequests: boolean = true;

  numberOfRequests: number = 0;
  numberOfAdminRequests: number = 0;

  isButtonDisabled: boolean = false;
  buttonDisabledStates: { [groupId: string]: boolean } = {};

  myGroups: any;
  joinedGroups: any;
  otherGroups: any;

  userNotinGroup: any;
  usersInGroup: any;

  usernames: any;
  firstQuarterGroups: any;
  secondQuarterGroups: any;
  thirdQuarterGroups: any;
  fourthQuarterGroups: any;
  profilePicPath: any;

  group: Group = new Group(0, " ", " ",[], [], [], [], {}, true);

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    const storedUser = window.sessionStorage.getItem('current.user');
    if (storedUser) {

      this.loggedInUser = JSON.parse(storedUser);
      console.log(this.loggedInUser.role)
      this.profilePicPath=BACKEND_URL + "/" + this.loggedInUser.profilePic
    }


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

  console.log(this.isSuperAdmin)

    
    this.getGroups()
    this.getUsers()



    this.http.get<string[]>(BACKEND_URL + "/groups").subscribe(groupsNames => {
      this.allGroupNames = groupsNames;

    });
  }

  onGroupCardClick(group:any ){
    this.selectedGroup = group;

    this.router.navigate(['/channels'], { queryParams: { yourKey: JSON.stringify(group) }})
  }

  requestButton(group:any){
    
    //console.log(this.loggedInUser.username)

    group.userRequests.push(this.loggedInUser.username);
    this.clickedGroups.push(group.groupName);

    //console.log(group)

    this.http.post(BACKEND_URL+"/update-groups", group).subscribe(
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
    this.buttonDisabledStates[group.groupID] = true;
  }

  isGroupClicked(groupName: string): boolean {
    return this.clickedGroups.includes(groupName);
}



  editGroupUsers(group:any){
    this.selectedGroup = group;
    console.log(group)
    console.log(this.users)
    console.log(this.groups)

    this.userNotinGroup
    this.usersInGroup
    // Get all usernames
    // Filter usernames that are in group.members
    this.usersInGroup = this.usernames.filter((username: any) => group.members.includes(username));
    // Filter usernames that are not in group.members
    this.userNotinGroup = this.usernames.filter((username: any) => !group.members.includes(username));
    $('#editGroupUsers').modal('show');
  }

  addUserFromGroup(group:any, username:any){
    console.log("add " + username + " from" + group)
    console.log(group)

    group.members.push(username);

    this.http.post(BACKEND_URL+"/update-groups", group).subscribe(
      response => {
          console.log('User details updated on the server.', response);

          //refesh User list 
          this.getGroups();
          this.getUsers();
          this.editGroupUsers(group)
      },
      error => {
          console.error('There was an error updating the user details on the server.', error);
          alert('Error updating profile. Please try again.');
      }
    )
  }

  removeUserFromGroup(group:any, username:any){
    const index = group.members.indexOf(username);
    group.members.splice(index, 1)

    this.http.post(BACKEND_URL+"/update-groups", group).subscribe(
      response => {
          console.log('User details updated on the server.', response);

          //refesh User list 
          this.getGroups();
          this.getUsers();
          this.editGroupUsers(group)
      },
      error => {
          console.error('There was an error updating the user details on the server.', error);
          alert('Error updating profile. Please try again.');
      }
    )
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

  leaveGroup(group:any){
    console.log(group)
    console.log(this.loggedInUser.username)
  
      // Remove user from group.members
      group.members = group.members.filter((member: any) => member !== this.loggedInUser.username);
  
      // Loop through each channel in group.channels and remove the user
      for (const channelName in group.channels) {
          group.channels[channelName] = group.channels[channelName].filter((member: any) => member !== this.loggedInUser.username);
      }
      this.http.post(BACKEND_URL+"/update-groups", group).subscribe(
        response => {
  
            //refesh User list 
            this.getGroups();
        },
        error => {
            console.error('There was an error updating the user details on the server.', error);
            alert('Error updating profile. Please try again.');
        }
      )
  }

  saveGroup(){
    console.log(this.newGroupName)
    console.log(this.groupChannels)

    this.GetNewGroupID()

    console.log(this.newGroupID)

    let channelsObject: { [channelName: string]: string[] } = {};
      this.groupChannels.forEach(channel => {
        channelsObject[channel] = [];
      });

    if (this.isUniqueGroup === true){
      this.group.groupID = this.newGroupID;
      this.group.groupName = this.newGroupName;
      this.group.createdBy = this.loggedInUser.username;
      this.group.groupAdmins = [this.loggedInUser.username];
      this.group.userRequests = [];
      this.group.members = [this.loggedInUser.username];
      this.group.channels = channelsObject;
      this.group.valid = true;
  
      console.log(this.group)
  
      this.http.post(BACKEND_URL+"/update-groups", this.group).subscribe(
        response => {
            console.log('User details updated on the server.', response);
  
            //refesh User list 
            this.getGroups();
            this.cdr.detectChanges();
        },
        error => {
            console.error('There was an error updating the user details on the server.', error);
            alert('Error updating profile. Please try again.');
        }
      )
      this.closeModal("newGroup")
    }else{
      alert("Group already exists");
    }
    //location.reload();
  }

  closeModal(modalType: string | undefined){

    if(modalType == "newGroup"){

      this.group = {
        groupID: 0,
        groupName: "",
        createdBy: this.loggedInUser.username,
        adminRequests:[],
        groupAdmins: [],
        userRequests: [],
        members: [],
        channels: {},
        valid: true
    };
  
    this.newGroupName=''
  
    this.groupChannels=[]
  
    //console.log(this.group)
      $('#addGroupModal').modal('hide');
    }

    if(modalType == "requestApproval"){
      $('#approveRequests').modal('hide');
    } 

    if(modalType == "requestAdminApproval"){
      $('#approveAdminRequests').modal('hide');
    } 

    if(modalType == "editUsers"){
      $('#editGroupUsers').modal('hide');
    } 

  }

  getUsers(){
    this.http.get(BACKEND_URL + "/all-users", httpOptions)
    .subscribe(
        (data: any) => {
            if (data) {
              this.users = data
              //console.log(this.users)
              this.usernames = this.users.filter((u: { valid: any; }) => u.valid).map((u: { username: any; }) => u.username);
              //console.log(this.usernames);

            } else {
                alert("no Data Soz");
            }
        },
        error => {console.error('There was an error:', error);}
    );
  }

  getGroups() {
    this.http.get(BACKEND_URL + "/all-groups", httpOptions)
    .subscribe(
        (data: any) => {
            if (data) {
                // All groups that are valid
                this.superGroups = data.filter((group: { valid: boolean; }) => group.valid === true);

                const quarterLength = Math.ceil(this.superGroups.length / 4);
  
                this.firstQuarterGroups = this.superGroups.slice(0, quarterLength);
                this.secondQuarterGroups = this.superGroups.slice(quarterLength, quarterLength * 2);
                this.thirdQuarterGroups = this.superGroups.slice(quarterLength * 2, quarterLength * 3);
                this.fourthQuarterGroups = this.superGroups.slice(quarterLength * 3);

                // Rest of your code remains unchanged...
                this.groups = this.superGroups;
  
                this.numberOfAdminRequests= this.groups.filter((group: { adminRequests: string | any[]; }) => group.adminRequests && group.adminRequests.length > 0).length

                if (this.loggedInUser.role === 3){
                  this.numberOfRequests = this.groups.filter((group: { userRequests: string | any[]; }) => group.userRequests && group.userRequests.length > 0).length
                } else if(this.loggedInUser.role === 2){
                  this.numberOfRequests = this.groups.filter((group: { userRequests: string | any[]; groupAdmins: any[]; }) => 
                  group.groupAdmins.includes(this.loggedInUser.username) && 
                  group.userRequests && 
                  group.userRequests.length > 0).length;
                }


                // Groups created by loggedInUser
                this.myGroups = this.groups.filter((group: { createdBy: any; groupAdmins: any; }) => 
                    group.createdBy === this.loggedInUser.username || group.groupAdmins.includes(this.loggedInUser.username));

                // Groups that loggedInUser is a member of but not created by them
                this.joinedGroups = this.groups.filter((group: { members: string | any[]; createdBy: any; groupAdmins: any; }) => 
                    group.members.includes(this.loggedInUser.username) && group.createdBy !== this.loggedInUser.username && !group.groupAdmins.includes(this.loggedInUser.username));

                // Groups that loggedInUser has neither created nor joined
                this.otherGroups = this.groups.filter((group: { createdBy: any; members: string | any[]; }) => 
                    group.createdBy !== this.loggedInUser.username && !group.members.includes(this.loggedInUser.username));
            } else {
                alert("no Data Soz");
            }
        },
        error => {
            console.error('There was an error:', error);
        }
    );
}


  GetNewGroupID(){
    if (this.groups && this.groups.length > 0) {
      this.newGroupID = this.groups[this.groups.length - 1].groupID + 1;
  } else {
      this.newGroupID = 1;
  }
  }

  showRequests(){
    this.getGroups();  
    // this.getRequests()

    $('#approveRequests').modal('show');

    if(this.groups.length > 0){
      //this.noRequests=false
      this.groupsNeedApproval = this.groups.filter((group: { userRequests: string | any[]; }) => group.userRequests && group.userRequests.length > 0);
    }
  }

  requestAdminButton(group:any){
        
        console.log(this.loggedInUser.username)

        group.adminRequests.push(this.loggedInUser.username);
        this.http.post(BACKEND_URL+"/update-groups", group).subscribe(
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
        this.buttonDisabledStates[group.groupID] = true;
  }

  deleteGroup(group:any){

    console.log(group)

    group.valid = false

    this.http.post(BACKEND_URL+"/update-groups", group).subscribe(
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
  }

  showAdminRequests(){
    this.getGroups();  

    $('#approveAdminRequests').modal('show');

    console.log(this.groups)

    if(this.groups.length > 0){
      //this.noRequests=false
      this.groupsAdminNeedApproval = this.groups.filter((group: { adminRequests: string | any[]; }) => group.adminRequests && group.adminRequests.length > 0);
          }
  }



  approveRequest(group: any, userRequest: string){
    console.log(group);
    console.log(userRequest);

    if (group.userRequests.includes(userRequest)) {
      group.members.push(userRequest);
      group.userRequests.splice(group.userRequests.indexOf(userRequest), 1);
  }

  this.http.post(BACKEND_URL+"/update-groups", group).subscribe(
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

  }

  approveAdminRequest(group: any, adminRequest: string){
  console.log(group);
  console.log(adminRequest);

  if (group.adminRequests.includes(adminRequest)) {
    group.groupAdmins.push(adminRequest);
    group.adminRequests.splice(group.adminRequests.indexOf(adminRequest), 1);
  }
  console.log(group);

  this.http.post(BACKEND_URL+"/update-groups", group).subscribe(
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
  }


}