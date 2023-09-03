import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = "http://localhost:3000";

declare var $: any;

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  passedGroupObject: any;

  myChannels: any;
  toJoinChannels: any;

  currentGroup: any;
  currentChannels: any;


  joinChannelskeys: any;
  myChannelskeys: any;

  loggedInUser:any; 
  groups: any;

  newChannelName: any;

  channelsUserCreated:any; 

  isAdmin = false

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
}

ngOnInit(): void {

  const storedUser = window.sessionStorage.getItem('current.user');
  if (storedUser) {

    this.loggedInUser = JSON.parse(storedUser);
  }

  if (this.loggedInUser.role === 3){
    this.isAdmin = true;
    console.log(this.isAdmin)
  }

  console.log(this.loggedInUser.role)

  this.route.queryParams.subscribe(params => {
    let currentGroupString = params['yourKey'];
    
    // Check if the data is stringified object
    try {
        this.passedGroupObject = JSON.parse(currentGroupString);
        console.log(this.passedGroupObject);
    } catch (e) {
        console.error('Error parsing the object', e);
    }

    this.getGroups()

 });
}

// getchannelsKeys() {
//   this.currentChannelskeys = Object.keys(this.currentGroupObject.channels);
// }

addUserToChannel(targetChannel: any) {
  this.getGroups();
  console.log(targetChannel);
  console.log(this.loggedInUser.username);

  // Loop over each channel in this.currentGroup.channels
  for (let channel in this.currentGroup.channels) {
      // If the channel name matches the target and the user is not in the channel array
      if (channel === targetChannel && !this.currentGroup.channels[channel].includes(this.loggedInUser.username)) {
          this.currentGroup.channels[channel].push(this.loggedInUser.username);
          console.log(`Added ${this.loggedInUser.username} to ${channel}`);
          break; // Exit the loop as we've found and processed the target channel
      }
  }
  
  this.http.post(BACKEND_URL+"/update-groups", this.currentGroup).subscribe(
    response => {
        console.log('User details updated on the server.', response);

        //refesh User list 
        this.getGroups();
    },
    error => {
        console.error('There was an error updating the user details on the server.', error);
        alert('Error updating profile. Please try again.');
    }
  )}

  removeUserFromChannel(targetChannel: any) {
    // Fetch the groups
    this.getGroups();
    console.log(targetChannel);
    console.log(this.loggedInUser.username);

    // Loop over each channel in this.currentGroup.channels
    for (let channel in this.currentGroup.channels) {
        // If the channel name matches the target and the user is in the channel array
        if (channel === targetChannel && this.currentGroup.channels[channel].includes(this.loggedInUser.username)) {
            const userIndex = this.currentGroup.channels[channel].indexOf(this.loggedInUser.username);
            
            if (userIndex > -1) {
                this.currentGroup.channels[channel].splice(userIndex, 1); // Remove the user from the channel
                console.log(`Removed ${this.loggedInUser.username} from ${channel}`);
                break; // Exit the loop as we've found and processed the target channel
            }
        }
    }
  
    // Update the groups on the server
    this.http.post(BACKEND_URL+"/update-groups", this.currentGroup).subscribe(
        response => {
            console.log('User details updated on the server.', response);

            // Refresh the User list 
            this.getGroups();
        },
        error => {
            console.error('There was an error updating the user details on the server.', error);
            alert('Error updating profile. Please try again.');
        }
    );
}

addChannel(){
  
  $('#addChannelModal').modal('show');
  console.log(this.currentGroup)
  console.log(this.newChannelName)


  if (this.newChannelName) {
    this.currentGroup.channels[this.newChannelName] = [];
  } else {
    console.error('newChannelName is undefined!');
  }

  console.log(this.currentGroup.channels)
  


  this.http.post(BACKEND_URL+"/update-groups", this.currentGroup).subscribe(
    response => {
        console.log(' details updated on the server.', response);

        this.getGroups();
        
    },
    error => {
        console.error('There was an error updating the  details on the server.', error);
        alert('Error updating profile. Please try again.');
    }
  )


  this.closeModal("");

}

closeModal(modalType: string | undefined){
    $('#addChannelModal').modal('hide');
}

deleteChannel(targetChannel: any) {
  console.log(targetChannel);

  if (this.currentGroup.channels && this.currentGroup.channels.hasOwnProperty(targetChannel)) {
    delete this.currentGroup.channels[targetChannel];
  } else {
    console.warn('Channel not found in current group.');
  }
  console.log(this.currentGroup);

  this.http.post(BACKEND_URL+"/update-groups", this.currentGroup).subscribe(
    response => {
        console.log(' details updated on the server.', response);

        this.getGroups();
        
    },
    error => {
        console.error('There was an error updating the  details on the server.', error);
        alert('Error updating profile. Please try again.');
    }
  )
}



getGroups(){
  this.http.post(BACKEND_URL + "/all-groups", httpOptions)
  .subscribe(
      (data: any) => {
          if (data) {
            this.groups = data
            const matchedGroup = this.groups.find((group: { groupID: any; }) => group.groupID === this.passedGroupObject.groupID);
            if (matchedGroup) {
                this.currentGroup = matchedGroup;
                //console.log("Matched")
                console.log(this.currentGroup)

                if (this.currentGroup.groupAdmins.includes(this.loggedInUser.username)) {
                  this.isAdmin = true;
                } else if (this.loggedInUser.role==3){
                this.isAdmin = true;
                }else{
                  this.isAdmin = false;
                }
                



                this.myChannels = [];
                this.toJoinChannels = [];

                for (let channel in this.currentGroup.channels) {
                  if (this.currentGroup.channels[channel].includes(this.loggedInUser.username)) {
                      // If the loggedInUser is in the channel, add it to myChannels
                      this.myChannels.push(channel);
                  } else {
                      // Otherwise, add it to toJoinChannels
                      this.toJoinChannels.push(channel);
                  }
              }

              this.channelsUserCreated


                // this.myChannels = 

                // // = Object.keys(this.currentGroup.channels);
                // this.toJoinChannels=

                // this.currentGroup.channel

            } else {
                console.log(`No group found with groupID: ${this.passedGroupObject.groupID}`);
            }






          } else {
              alert("no Data Soz");
          }
      },
      error => {console.error('There was an error:', error);}
  );
}

}
