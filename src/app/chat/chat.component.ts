import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SocketService} from 'src/app/service/socket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { Message } from 'server/models/messageModel';

const BACKEND_URL = "http://localhost:3000";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

  messagecontent: string="";
  //messages: string[] = [];
  ioConnection:any;
  channel: any;
  currentChannel: string | null = null;
  loggedInUser : any;
  messages: Message[] = [];

  group: any;

  constructor (private http: HttpClient, private socketService: SocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.socketService.initSocket();

    const storedUser = window.sessionStorage.getItem('current.user');
    if (storedUser) {

      this.loggedInUser = JSON.parse(storedUser);
      //console.log(this.loggedInUser.username)
    }
    this.route.queryParams.subscribe(params => {
        this.channel = params['yourKey'];
        console.log(this.channel)
        this.group="group1"
        this.initIoConnection();
        this.socketService.join(this.channel);
        this.messages = []; // Clear the previous messages when changing the channel.
    });
}


initIoConnection() {
  if (this.ioConnection) this.ioConnection.unsubscribe();

  this.ioConnection = this.socketService.getMessage().subscribe((data: any) => {
      console.log('Received:', data);
      if (data.channel === this.channel) {
          this.messages.push(data as Message);
          console.log(this.messages);

          const messageData = {
              groupName: this.group, // Assuming you have this.group set to the current group name
              channelName: this.channel,
              message: {
                  messageString: data.message, // The actual message content
                  sentBy: data.username, // The user who sent the message
                  timestamp: new Date().toISOString() // Current timestamp
              }
          };

          this.http.post(BACKEND_URL + "/messages", messageData, httpOptions).subscribe(
              response => {
                  console.log('Message saved on the server.', response);
              },
              error => {
                  console.error('There was an error saving the message on the server.', error);
                  alert('Error saving message. Please try again.');
              }
          )
      }
  });
}


sendMessage() {
  console.log('Emitting message:', this.messagecontent);
  if (this.messagecontent) {
    this.socketService.send(this.messagecontent, this.channel);
    this.messagecontent = "";
  }
}
}