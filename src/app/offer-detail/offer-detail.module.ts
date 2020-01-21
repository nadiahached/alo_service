import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OfferDetailPageRoutingModule } from './offer-detail-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { OfferDetailPage } from './offer-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferDetailPageRoutingModule
  ],
  declarations: [OfferDetailPage],
  providers:[Geolocation]
})
export class OfferDetailPageModule {}
