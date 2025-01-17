import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,ReactiveFormsModule,

    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
