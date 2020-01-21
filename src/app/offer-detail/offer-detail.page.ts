import { Component, OnInit } from '@angular/core';
import leaflet from 'leaflet';
import {ActivatedRoute} from "@angular/router";
import {LatLong} from "../models/latlong.model";
import 'leaflet.awesome-markers'
import 'leaflet-routing-machine';
import {Subscription} from "rxjs";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.page.html',
  styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {
  redMarker =leaflet.AwesomeMarkers.icon({
    icon: 'home',
    markerColor: 'red'
  });
  map:any;
  subscription :Subscription ;
  latitude: any;
  longitude: any;
  routeControl:any;
  user_marker :any  = leaflet.marker([36.8312625,10.2306552],{icon:this.redMarker});
  circle=leaflet.circle([36.8312625,10.2306552],{color:'#CF3C29'});
  findme:boolean=false;
  offerPosition:{"lat":number,"long":number}={"lat":0,'long':0};

  constructor(public activatedRoute:ActivatedRoute,
              private geolocation: Geolocation,
  ) {

    this.activatedRoute.queryParams.subscribe((res) => {
       console.log(res);
      this.offerPosition.lat=parseFloat(res["position_lat"]);
      this.offerPosition.long=parseFloat(res["position_long"]);
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadmap();
    await this.addMarker_user();
    await this.load_route(this.offerPosition.lat,this.offerPosition.long);
  }
  load_route(lat:number,lng:number){
    let options = {
      enableHighAccuracy: true,
      maxAge: 0,
      timeout: 5000,
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      let waypoints = [
        leaflet.latLng(resp.coords.latitude,resp.coords.longitude),
        leaflet.latLng(lat,lng)
      ];

      this.routeControl=leaflet.Routing.control({

        plan: leaflet.Routing.plan(waypoints, {

          createMarker: function(i, wp) {
            if(i===0){
              return leaflet.marker(wp.latLng );
            }
            else if(i===1){
              return leaflet.marker(wp.latLng);
            }

          }
        }),
        routeWhileDragging: false,
      }).on('routesfound', function(e) {
        var routes = e.routes;
      }).addTo(this.map);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  loadmap()
  {
    var container = leaflet.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }
    console.log("dans load page");
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 19,
    }).addTo(this.map);
    this.map.setView([36.8312625,10.2306552],12);
  }
  addMarker_user(){
    let options = {
      enableHighAccuracy: true,
      maxAge: 0,
      timeout: 5000,
    };

    this.subscription= this.geolocation.watchPosition(options).subscribe((data)=>{

      this.latitude=data.coords.latitude;
      this.longitude=data.coords.longitude;
      this.findme=true;
      console.log(this.longitude,this.latitude);
      this.user_marker.setLatLng([data.coords.latitude,data.coords.longitude]);
      //this.user_marker.setIcon(this.redMarker);
      this.circle.setLatLng([data.coords.latitude,data.coords.longitude]);


    })
  }
}
