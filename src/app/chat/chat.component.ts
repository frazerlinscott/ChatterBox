import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SocketService} from 'src/app/service/socket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { Message } from 'server/models/messageModel';
import {ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { UploadService } from '../service/upload.service';
import { Observable } from 'rxjs';
import { UploadResponse } from 'server/models/interfaces';

import { CommonModule } from '@angular/common';



const BACKEND_URL = "http://localhost:3000";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('chatMessages', { static: false }) chatMessages?: ElementRef;

  messagecontent: string="";
  //messages: string[] = [];
  ioConnection:any;
  channel: any;
  currentChannel: string | null = null;
  loggedInUser : any;
  messages: Message[] = [];

  profilePicPath: any;

  attachmentFile: File | null = null;
 
  group: any;
  currentGroupString:any
  URL: any;
  attachmentId: number = 1;
  attachmentURL: any;

  constructor (private uploadService: UploadService, private http: HttpClient, private socketService: SocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.socketService.initSocket();

    this.URL = BACKEND_URL+"/"
    this.attachmentURL = BACKEND_URL+"/attachments/"

    const storedUser = window.sessionStorage.getItem('current.user');
    if (storedUser) {

      this.loggedInUser = JSON.parse(storedUser);
      //console.log(this.loggedInUser.username)
    }
    this.route.queryParams.subscribe(params => {
      this.channel = params['channel'];
      this.currentGroupString = params['currentGroup'];

        this.initIoConnection();

        this.socketService.join(this.channel);

        this.fetchPreviousMessages(this.currentGroupString, this.channel);

        //this.messages = []; // Clear the previous messages when changing the channel.
    });
}

ngAfterViewChecked(): void {
  this.scrollToBottom();
}

fetchPreviousMessages(groupName: string, channelName: string): void {
  const url = `${BACKEND_URL}/messages?groupName=${groupName}&channelName=${channelName}`;
  this.http.get<Message[]>(url).subscribe(
    (data: Message[]) => {

      this.messages = data;

      console.log(this.messages)
    },
    error => {
      console.error("Failed to fetch previous messages", error);
    }
  );
}

private scrollToBottom(): void {
  if (this.chatMessages) {
      const chat = this.chatMessages.nativeElement;
      chat.scrollTop = chat.scrollHeight;
  }
}

onFileSelected(event: any) {
  this.attachmentFile = <File>event.target.files[0];
  console.log("File selected: " +this.attachmentFile)
}


initIoConnection() {
  console.log('initIoConnection called');

  if (this.ioConnection) {
    this.ioConnection.unsubscribe();
  }

  this.ioConnection = this.socketService.getMessage().subscribe((data: any) => {
      console.log('Received:', data);

      if (data.channel === this.channel) {
          const newMessage = data as Message;
          
          // Attach profile picture to the new message if it's from the loggedInUser
          if (newMessage.username === this.loggedInUser.username && !newMessage.profilePic) {
              newMessage.profilePic = this.loggedInUser.profilePic;
          }

          this.messages.push(newMessage);
          console.log(this.messages);
      }
  });
}



sendMessage() {
  console.log('Send message')

  if (this.attachmentFile) {
    console.log(this.messagecontent ? "Sending both string message and attachment" : "Sending only an attachment");
    this.uploadAttachment();
  } else if (this.messagecontent) {
    console.log("Sending only string message");
    this.sendOnlyMessage();
  }
}

uploadAttachment() {
  const formData = new FormData();
  if (this.attachmentFile) {
    formData.append('photo', this.attachmentFile);
  }

  this.uploadService.uploadAttachment(formData).subscribe((response: UploadResponse) => {
    console.log('Upload successful', response);
    const attachmentId = response.attachmentId;
      
      // Send the message (or an empty string if there's no message content)
      this.sendAttachmentMessage(attachmentId);

      // Reset the attachment and message content after sending
      this.attachmentFile = null;
      this.messagecontent = "";

  }, error => {
      console.error('Upload error', error);
  });
}

sendAttachmentMessage(attachmentId: number) {
  this.socketService.send(this.messagecontent || "", this.channel, this.currentGroupString, attachmentId);
}

sendOnlyMessage() {
  this.socketService.send(this.messagecontent, this.channel, this.currentGroupString, 0);
  this.messagecontent = "";
}

}


//   sendMessage() {

//     let attachmentId = "dummieattachmentID"; // Assuming server responds with an ID for the uploaded attachment

//     if (this.attachmentFile) {
//       const formData = new FormData();
//       formData.append('photo', this.attachmentFile);
//       formData.append('attachmentID', this.attachmentFile);

//       console.log("username sent");

//       this.uploadService.uploadAttachment(formData).subscribe(response => {
//         console.log('Upload successful', response);

//         if (this.messagecontent) {
//           // Send the message along with the attachment ID
//           this.socketService.send(this.messagecontent, this.channel, this.currentGroupString, attachmentId);
//           this.messagecontent = "";
//         }

//         // Maybe reset the attachment after sending
//         this.attachmentFile = null;
//       }, error => {
//         console.error('Upload error', error);
//         // Handle upload errors
//       });

//     } else if (this.messagecontent) {
//       // If there's no attachment, but there's message content, send the message
//       this.socketService.send(this.messagecontent, this.channel, this.currentGroupString, attachmentId);
//       this.messagecontent = "";
//     }
//   }
