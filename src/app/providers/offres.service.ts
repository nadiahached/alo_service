import { Injectable } from '@angular/core';
import {Offer} from "../models/offre.model";
import {Subject} from "rxjs";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class OffresService {
  Offers: Offer[] =[];
  OffersSubject = new Subject<Offer[]>();

  constructor() {
  }


  emitOffers() {
    this.OffersSubject.next(this.Offers);
  }

  saveOffers(service:string) {
    firebase.database().ref('alo_service/offers/'+service).set(this.Offers);
  }


  getOffers(service:string) {
    firebase.database().ref('alo_service/offers/'+service)
        .on('value', (data: DataSnapshot) => {
              this.Offers = data.val() ? data.val() : [];
              this.emitOffers();
            }
        );
  }
  createNewOffre(newOffer:Offer,service:string) {
      this.Offers.push(newOffer);
      this.saveOffers(service);
      this.emitOffers();
  }

  removeOffer(Offer: Offer,service:string) {
    const OfferIndexToRemove = this.Offers.findIndex(
        (OffertEl) => {
          if(OffertEl === Offer) {
            return true;
          }
        }
    );
    this.Offers.splice(OfferIndexToRemove, 1);
    this.saveOffers(service);
    this.emitOffers();
  }
    ionViewWillLeave(){

    }
}
