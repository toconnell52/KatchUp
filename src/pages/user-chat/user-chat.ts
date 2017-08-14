import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Profile } from "../../models/profile/profile.interface";
import { Message } from "../../models/messages/message.interface";
import { AuthService } from "../../providers/auth/auth.service";
import { DataService } from "../../providers/data/data.service";
import { ChatService } from "../../providers/chat/chat.service";
import { Observable } from "rxjs/Observable";


@IonicPage()
@Component({
  selector: 'page-user-chat',
  templateUrl: 'user-chat.html',
})
export class UserChatPage {

  selectedProfile: Profile;

  messageList: Observable<Message[]>;

  userId: string;
  userProfile: Profile;

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthService, private data: DataService, private chat: ChatService) {

  }

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');
    this.auth.getAuthenticatedUser().subscribe(auth => this.userId = auth.uid);
    this.data.getAuthenticatedUserProfile().subscribe(profile => this.userProfile = profile);
    this.messageList = this.chat.getChats(this.selectedProfile.$key);
  }

  async sendMessage(content: string) {

    try {
      const message: Message = {
        userToId: this.selectedProfile.$key,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName,
          avatar: this.selectedProfile.avatar
        },
        userFromProfile: {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName,
          avatar: this.userProfile.avatar
        },
        userFromId: this.userId,
        content: content
      }

      await this.chat.sendChat(message);

    } catch (e) {
      console.error(e);
    }

  }

}
