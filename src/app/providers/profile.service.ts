import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    user = new User();

    constructor() {
    }

    saveProfile(user: User) {
        let UserUid: string = user.uid;
        firebase.database().ref('alo_service/user/'+UserUid).set(user);
    }

    getProfile() {
        return new Promise(
            (resolve, reject) => {
                let UserUid: string = firebase.auth().currentUser.uid;
                firebase.database().ref('alo_service/user/').child(UserUid).
                once('value').then(
                    (data) => {
                        resolve(data.exportVal());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );

    }
}


