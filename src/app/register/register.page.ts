import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../providers/auth.service";
import * as firebase from 'firebase' ;
import {ProfileService} from "../providers/profile.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userFrom: FormGroup;
  errorMessage: string;
  user=new User();
  constructor(private router: Router,
              private menu :MenuController,
              private formBuilder: FormBuilder,
              private authService:AuthService,
              private ProfileService:ProfileService

  ) {
    this.menu.enable(false);

  }

  ngOnInit() {
    this.initForm();

  }
  initForm() {
    this.userFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      UserName: ['', [Validators.required]],
      BirthDay: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],

    });
  }

  async register() {
          this.user.email=this.userFrom.get('email').value;
          const password = this.userFrom.get('password').value;
          this.user.userName =this.userFrom.get('UserName').value;
          this.user.brithday = this.userFrom.get('BirthDay').value;
          this.user.phoneNumber =this.userFrom.get('PhoneNumber').value;
          
          await this.authService.createNewUser(this.user.email,password).then(
                          async () => {
                            this.user.uid=firebase.auth().currentUser.uid;
                            console.log(this.user);
                            await this.ProfileService.saveProfile(this.user);
                            await this.router.navigate(['/home']);
                            await this.menu.enable(true);


              },
              (error) => {
                this.errorMessage = error;
              }
          );

  }

  home(){

  }





  login(){
    this.router.navigate(['/login']);
  }
}
