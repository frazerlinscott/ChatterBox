import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import io from "socket.io-client";


const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  socket:any;
  username: any; 

  constructor() { }

  initSocket(){
    if (!this.socket) {
        this.socket = io(SERVER_URL);
    }
    return () => { this.socket.disconnect(); }
}

  join(channel: string): void {
    this.socket.emit('join', channel);
  }


send(message: string, channel: string, groupName: string, attachment: number): void {
  const storedUser = window.sessionStorage.getItem('current.user');
  if (storedUser) {
    let userObject = JSON.parse(storedUser);
    let username = userObject.username;
    let profilePic = userObject.profilePic;
    console.log(profilePic);
    const timestamp = new Date();
    const dataToSend = { message, channel, username, timestamp, groupName, profilePic, attachment };
    this.socket.emit('message', dataToSend);
  }
}

isSocketInitialized(): boolean {
  return this.socket ? true : false;
}


getMessage(): Observable<any> {
  return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => {
          observer.next(data);
      });
  });
}
}
