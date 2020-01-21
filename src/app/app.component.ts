import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from "@angular/router";
import * as firebase from 'firebase'
import {AuthService} from "./providers/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'

    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,

  ) {
    var config= {
      apiKey: "AIzaSyAnh1WUFSPvAul9cWSCL_qMgSIJLRjdfFQ",
      authDomain: "fir-auth-3e4bd.firebaseapp.com",
      databaseURL: "https://fir-auth-3e4bd.firebaseio.com",
      projectId: "fir-auth-3e4bd",
      storageBucket: "fir-auth-3e4bd.appspot.com",
      messagingSenderId: "601972599478",
      appId: "1:601972599478:web:557f12b70c5b6b23f4d417"
    };
    firebase.initializeApp(config);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout(){
    this.authService.signOutUser();
    this.menu.enable(false);
    this.router.navigate(['/landing'])  }
}
