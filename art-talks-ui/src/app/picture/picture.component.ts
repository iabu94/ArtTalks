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
  newMessage = '';

  @Input() selectedPicture!: Picture;

  chats: Chat[] = [];
  filteredChats: Chat[] = []

  constructor(private chatService: ChatService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.chatService.allMessagesSub.subscribe(chats => {
      this.chats = chats;
      this.filteredChats = chats.filter(c => c.id === this.selectedPicture.id);
    });
  }

  log(type: string, value: any) {
    console.log(type, value);
  }

  sendMessage() {
    if (!this.getCurrentUser()) {
      this.openDialog();
    } else {
      const message: Chat = {
        id: this.selectedPicture.id,
        sender: this.getCurrentUser(),
        message: this.newMessage
      };
      this.chatService.sendMessage(message.id, message.sender, message.message);
      this.newMessage = '';
    }
  }

  getCurrentUser(): string {
    return localStorage.getItem('user-at') ?? '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {name: this.getCurrentUser()},
    });

    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem('user-at', result);
    });
  }
}



