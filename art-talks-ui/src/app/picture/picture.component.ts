import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
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
  userName = '';

  chats: Chat[] = [];

  constructor(private chatService: ChatService, public dialog: MatDialog) {
    this.chatService.chatMessage$.subscribe(message => {
      this.chats.push(message);
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    if (!this.getCurrentUser()) {
      this.openDialog();
    } else {
      const message: Chat = {
        sender: this.userName,
        message: this.newMessage
      };
      this.chatService.sendMessage(message.sender, message.message);
      this.newMessage = '';
    }
  }

  getCurrentUser(): string {
    return localStorage.getItem('user') ?? '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {name: this.userName},
    });

    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem('user', result);
      this.userName = result;
    });
  }
}
