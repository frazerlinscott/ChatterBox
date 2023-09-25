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
    this.socket = io(SERVER_URL);
    return () =>{this.socket.disconnect();}
  }

  join(channel: string): void {
    this.socket.emit('join', channel);
  }

  send(message: string, channel: string): void {

    const storedUser = window.sessionStorage.getItem('current.user');
    if (storedUser) {
      let userObject = JSON.parse(storedUser);
      console.log(userObject.username)
      let username=userObject.username
      console.log(username);
      this.socket.emit('message', { message, channel, username });
    }
  }


  getMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }
};
