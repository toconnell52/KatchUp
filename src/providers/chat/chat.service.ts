import { Injectable } from '@angular/core';
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/forkJoin";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Channel } from "../../models/channel/channel.interface";
import { ChannelMessages } from "../../models/channel/channel-messages.interface";
import { Message } from "../../models/messages/message.interface";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {

  constructor(private database: AngularFireDatabase, private auth: AuthService) {

  }

  addChannel(channelName: string) {
      return this.database.list(`/channel-names/`).push({name: channelName});
  }

  getChannelListRef(): FirebaseListObservable<Channel> {
      return this.database.list(`/channel-names/`);
  }

  getChatroomRef(channelKey: string): FirebaseListObservable<Channel> {
    return this.database.list(`channels/${channelKey}`);
  }

  async sendChannelChatMessage(channelKey: string, message: ChannelMessages) {
    await this.database.list(`/channels/${channelKey}`).push(message);
  }

  async sendChat(message: Message) {
    await this.database.list(`/messages`).push(message);
  }

  getChats(userTwoId: string) {
    return this.auth.getAuthenticatedUser().map(auth => auth.uid).mergeMap(uid => this.database.list(`/user-messages/${uid}/${userTwoId}`)).mergeMap(chats => {
      return Observable.forkJoin(
        chats.map(chat => this.database.object(`/messages/${chat.$key}`).first()),
        (...vals: Message[]) => {
          return vals;
        }
      );
    });
  }

  getLastMessagesForUser(): Observable<Message[]> {
    return this.auth.getAuthenticatedUser().map(auth => auth.uid).mergeMap(authId => this.database.list(`/last-messages/${authId}`)).mergeMap(messageIds => {
      return Observable.forkJoin(
        messageIds.map(message => {
          return this.database.object(`/messages/${message.key}`).first()
        }),
        (...values) => {
          return values
        }
      )
    });
  }

}