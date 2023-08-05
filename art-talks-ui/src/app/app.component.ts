import { Component } from '@angular/core';
import { Chat } from './models';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'art-talks-ui';

  allMessages: Chat[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.chatMessage$.subscribe();
  }
}
