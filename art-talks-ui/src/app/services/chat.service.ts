import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { Chat } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hub: SignalR.HubConnection;
  private chatMessageSub = new Subject<Chat>();
  chatMessage$ = this.chatMessageSub.asObservable();
  allMessages: Chat[] = [];
  allMessagesSub = new BehaviorSubject<Chat[]>([]);
  baseUrl = 'https://localhost:7129';

  constructor() {
    this.hub = new SignalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + '/chat')
      .build();

    this.hub
      .start()
      .catch((err) =>
        console.error('Error while starting the SignalR connection: ', err)
      );

    this.hub.on(
      'ReceiveMessage',
      (id: number, sender: string, message: string) => {
        const chatMessage: Chat = {
          id: id,
          sender: sender,
          message: message,
        };
        this.chatMessageSub.next(chatMessage);
        const msgs = this.allMessagesSub.getValue();
        msgs.push(chatMessage);
        this.allMessagesSub.next(msgs);
      }
    );
  }

  sendMessage(id: number, sender: string, message: string): void {
    this.hub
      .invoke('SendMessage', id, sender, message)
      .catch((err) => console.error('Error while sending message: ', err));
  }
}
