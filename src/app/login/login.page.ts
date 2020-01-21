import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {AuthService} from "../providers/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessage: string;
  userForm :FormGroup;
  constructor(private router: Router,
              private menu :MenuController,
              private formBuilder: FormBuilder,
              private authService: AuthService,
  ) {
    this.menu.enable(false);

  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  login() {
    const email = this.userForm.get('email').value;
    const password =this.userForm.get('password').value;

    this.authService.signInUser(email,password).then(
        (data)=> {
            this.router.navigate(['/home']);
             //this.userForm.reset();
            this.menu.enable(true);
            },
        (err)=>{
          this.errorMessage=err;
          this.userForm.reset();
        })
  }
  Register(){
    this.router.navigate(['/register']);
  }
}
