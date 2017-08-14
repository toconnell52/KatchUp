import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { ChatService } from "../../providers/chat/chat.service";
import { Channel } from "../../models/channel/channel.interface";
import { FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  channelList: FirebaseListObservable<Channel[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private chat: ChatService) {
  }

  ionViewWillLoad() {
    this.getChannels();
  }

  showAddChannelDialog() {
    this.alertCtrl.create({
      title: 'Channel Name',
      inputs: [{
        name: 'channelName'
      }],
      buttons: [
        {
          text: 'Canel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.chat.addChannel(data.channelName);
          }
        }
      ]
    }).present();
  }

  getChannels() {
    this.channelList = this.chat.getChannelListRef();
  }

  selectChannel(channel: Channel) {
    this.navCtrl.push('ChatroomPage', { channel });
  }

}
