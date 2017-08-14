import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../providers/auth/auth.service";
import { FIREBASE_CONFIG } from "./app.firebase.config";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService) {
    this.auth.getAuthenticatedUser().subscribe(auth => {
      !auth ? this.rootPage = 'LoginPage' : this.rootPage = 'TabsPage';
    });

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

