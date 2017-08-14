import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Channel } from "../../models/channel/channel.interface";
import { ChatService } from "../../providers/chat/chat.service";
import { FirebaseListObservable } from "angularfire2/database";
import { ChannelMessages } from "../../models/channel/channel-messages.interface";

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {

  channel: Channel;
  channelMessages: FirebaseListObservable<ChannelMessages[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private chat: ChatService) {
  }

  ionViewWillLoad() {
    this.channel = this.navParams.get('channel');
    this.channelMessages = this.chat.getChatroomRef(this.channel.$key);
  }

  sendMessage(content: string) {
    let channelMessage = {
      content
    }

    this.chat.sendChannelChatMessage(this.channel.$key, channelMessage);
  }

}
