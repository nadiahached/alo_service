import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {ProfileService} from "../providers/profile.service";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {User} from "../models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    user=new User();
  constructor(private menu :MenuController,
              private ProfileService:ProfileService) {
    this.menu.enable(true);

  }

  ngOnInit() {
     this.ProfileService.getProfile().then((user:User)=>
     {
         this.user=user;
         console.log(this.user)
     })
  }


    getProfile() {





    }

}

