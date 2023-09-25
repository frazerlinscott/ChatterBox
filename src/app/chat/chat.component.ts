import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SocketService} from 'src/app/service/socket.service';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  messagecontent: string="";
  messages: string[] = [];
  ioConnection:any;
  channel: any;
  currentChannel: string | null = null;


  

  constructor (private socketService: SocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
      console.log(data); // log the data to check its structure
      // only add the message to messages array if the channels match
      if (data.channel === this.channel) {
        this.messages.push(data.message);
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