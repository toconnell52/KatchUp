import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Profile } from "../../models/profile/profile.interface";

@IonicPage()
@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})
export class SearchUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openChat(profile: Profile) {
    this.navCtrl.push('UserChatPage', { profile });
  }

}
