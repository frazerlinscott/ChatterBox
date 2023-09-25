import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import io from "socket.io-client";

const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  socket:any;

  constructor() { }

  initSocket(){
    this.socket = io(SERVER_URL);
    return () =>{this.socket.disconnect();}
  }

  join(channel: string): void {
    this.socket.emit('join', channel);
  }

  send(message: string, channel: string): void {
    this.socket.emit('message', { message, channel });
  }
  


  getMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }
};
