import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../providers/chat/chat.service";
import { Message } from "../../models/messages/message.interface";
import { NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";

import "rxjs/Observable";

@Component({
  selector: 'app-last-message-list',
  templateUrl: 'last-message-list.component.html'
})
export class LastMessageListComponent implements OnInit {

  messageList$: Observable<Message[]>;

  constructor(private chat: ChatService, private navCtrl: NavController) {

  }

  ngOnInit(){
    this.messageList$ = this.chat.getLastMessagesForUser();
  }

  navigateToMessage(message: Message) {
    const selectedProfile = {
      $key: message.userToId,
      firstName: message.userToProfile.firstName,
      lastName: message.userToProfile.lastName,
      avatar: message.userToProfile.avatar
    }

    this.navCtrl.push('UserChatPage', {profile: selectedProfile})
  }

}
