import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SocketService} from 'src/app/service/socket.service';
import {FormsModule} from '@angular/forms';
import { Message } from 'server/models/messageModel';

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



  constructor (private socketService: SocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const storedUser = window.sessionStorage.getItem('current.user');
    if (storedUser) {

      this.loggedInUser = JSON.parse(storedUser);
      console.log(this.loggedInUser.username)
    }
    this.route.queryParams.subscribe(params => {
        this.channel = params['yourKey'];
        this.initIoConnection();
        this.socketService.join(this.channel);
        this.messages = []; // Clear the previous messages when changing the channel.
    });
}


  initIoConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage().subscribe((data: any) => {
      if (data.channel === this.channel) {
        this.messages.push(data as Message);
        console.log(this.messages); 
      }
    });
    
  }

    sendMessage() {
      if (this.messagecontent) {
          this.socketService.send(this.messagecontent, this.channel);
          this.messagecontent = "";
      }
    }


}