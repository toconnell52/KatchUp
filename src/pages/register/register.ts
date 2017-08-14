import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { LoginResponse } from "../../models/login/login-response.interface";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private navCtrl: NavController, private navParams: NavParams, private toast: ToastController) {
  }

  register(event: LoginResponse) {
    console.log(event);
    if(!event.error) {
      this.toast.create({
        message: `Account Created, please login and enjoy!`,
        duration: 3000
      }).present();
      this.navCtrl.setRoot('LoginPage');
    }
    else {
      this.toast.create({
        message: `Account Not Created ${event.error.message}`,
        duration: 3000
      }).present();
    }
  }

}
