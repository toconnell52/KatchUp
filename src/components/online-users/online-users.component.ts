import { Component, OnInit } from '@angular/core';
import { DataService } from "../../providers/data/data.service";
import { FirebaseListObservable } from "angularfire2/database";
import { Profile } from "../../models/profile/profile.interface";
import { NavController } from "ionic-angular";

@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit {

  userList: FirebaseListObservable<Profile[]>;

  ngOnInit(): void {
    this.setUserOnline();
    this.getOnlineUsres();
  }

  constructor(private data: DataService, private navCtrl: NavController) {

  }

  setUserOnline() {

    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.data.setUserOnline(profile);
    });

  }

  getOnlineUsres() {
    this.userList = this.data.getOnlineUsers();
  }

  openChat(profile: Profile) {
    this.navCtrl.push('UserChatPage', { profile });
  }

}
