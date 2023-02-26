import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatModel } from './models/chat.model';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'single-chat';


  chat$!: Observable<any>;
  messages: any[] = [];

  roomId: string = '';
  newMessage: string = '';
  userName: string = '';
  constructor(private chatService: ChatService) { }


  joinRoom(roomId: string) {
    if (roomId || this.userName) {
      console.log('Already joined in: ', roomId);
      this.chat$ = this.chatService.getMessagesByRoomId(roomId);
      this.chat$.subscribe((mesage: any) => { this.messages.push(mesage); });
    } else {
      window.alert('Please fill in the room id and your name');
    }

  }
  sendMessage(message: string) {
    let newMessageData: ChatModel = {
      roomId: this.roomId,
      msg: message,
      date: Date.now(),
      from: this.userName
    }
    this.chatService.sendMessageByRoom(newMessageData);
  }
}

