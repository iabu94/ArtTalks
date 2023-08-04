import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Chat } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hub: SignalR.HubConnection;
  private chatMessageSub = new Subject<Chat>();
  chatMessage$ = this.chatMessageSub.asObservable();
  baseUrl = "https://localhost:7129";

  constructor() { 
    this.hub = new SignalR.HubConnectionBuilder()
      .withUrl( this.baseUrl + '/chat')
      .build();

    this.hub.start().catch(err => console.error('Error while starting the SignalR connection: ', err));

    this.hub.on('ReceiveMessage', (sender: string, message: string) => {
      const chatMessage: Chat = {
        sender: sender,
        message: message
      };
      this.chatMessageSub.next(chatMessage);
    });
  }

  sendMessage(sender: string, message: string): void {
    this.hub.invoke('SendMessage', sender, message).catch(err => console.error('Error while sending message: ', err));
  }
}
