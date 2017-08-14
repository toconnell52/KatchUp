import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Profile } from "../../models/profile/profile.interface";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profile = {} as Profile;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.profile = this.navParams.get('existingProfile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  saveProfileResult(event: Boolean) {
    event ? this.navCtrl.setRoot('TabsPage') : console.log("Not Authenticated or saved");
  }

}
