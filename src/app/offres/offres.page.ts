import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {Offer} from "../models/offre.model";
import {OffresService} from "../providers/offres.service";
import * as firebase from 'firebase' ;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Subscription} from "rxjs";
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.page.html',
  styleUrls: ['./offres.page.scss'],
})

export class OffresPage implements OnInit {
  Service:string="";
  Offers: Offer[]=[];
  OfferSubscription: Subscription;
  User_uid:string;
  options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 60000
    };


  constructor(public activatedRoute: ActivatedRoute,
              public alertController :AlertController,
              public OffresService:OffresService,
              private geolocation: Geolocation,
              private route:Router,
              private callNumber: CallNumber) {
      this.Offers=[];
      //this.User_uid=firebase.auth().currentUser.uid;

  }
  ngOnInit() {
      this.activatedRoute.queryParams.subscribe((res) => {
          this.Service=res["service"];
          this.OfferSubscription = this.OffresService.OffersSubject.subscribe(
              (Offers: Offer[]) => {
                  this.Offers = Offers;
              });
          this.OffresService.getOffers(this.Service);
          this.OffresService.emitOffers();


      });
  }

  async onNewOffer() {
    const inputAlert = await this.alertController.create({
      header: 'Veuillez saisir les doonnées de votre offre',
      subHeader: "Votre offre",
      inputs: [
          {name:'description', type: 'text',placeholder: "Description"},
          {name:'price',type:'number',placeholder:'Price'},
          {name:'phone_number',type:'tel',placeholder:'Telephone'}
      ],

      buttons: [
          {text: 'Cancel'},
        {
            text: 'Ok',
          handler: data => {
            let offre= new Offer();
            offre.description=data.description;
            offre.price=data.price;
            offre.phone_number=data.phone_number;
            offre.owner_uid=firebase.auth().currentUser.uid;

              this.geolocation.getCurrentPosition(this.options).then((resp) => {
                  offre.position_lat=resp.coords.latitude;
                  offre.position_long=resp.coords.longitude;
                  this.OffresService.createNewOffre(offre,this.Service);
                  console.log(offre);
              }).catch((error) => {
                  console.log('Error getting location', error);
                  this.OffresService.createNewOffre(offre,this.Service);
                  console.log(offre);
              });
            }
        }]
    });

    await inputAlert.present();

  };

  onVeiwDetails(offer:Offer){
    this.route.navigate(['offer-detail'],{queryParams:offer})
  }
  onRemoveOffer(offer:Offer){
    this.OffresService.removeOffer(offer,this.Service);
  }
  onCallNumber(num:string){
      this.callNumber.callNumber(num, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));
  }
  ngOnDestroy() {
   this.OfferSubscription.unsubscribe();
   this.Offers=[];
  }
}
