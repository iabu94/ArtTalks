import { Component, Input, OnInit } from '@angular/core';
import { Chat, Picture } from '../models';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent implements OnInit {
  @Input() selectedPicture!: Picture;
  newMessage = '';

  chats: Chat[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.chatMessage$.subscribe(message => {
      console.log(message);
      this.chats.push(message);
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    const message: Chat = {
      sender: 'User',
      message: this.newMessage
    };
    this.chatService.sendMessage(message.sender, message.message);
    this.newMessage = '';
  }
}
