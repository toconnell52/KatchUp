import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Profile } from "../../models/profile/profile.interface";
import { AuthService } from "../../providers/auth/auth.service";

@IonicPage()

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  existingProfile = {} as Profile;

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthService) {

  }

  getExistingProfile(profile: Profile) {
    this.existingProfile = profile;
  }

  navigateToEditProfilePage() {
    this.navCtrl.push('EditProfilePage', { existingProfile: this.existingProfile });
  }

  signOut() {
    this.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
