import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';
import { OffresPageRoutingModule } from './offres-routing.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { OffresPage } from './offres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffresPageRoutingModule
  ],
  declarations: [OffresPage],
  providers:[Geolocation,CallNumber]
})
export class OffresPageModule {}
