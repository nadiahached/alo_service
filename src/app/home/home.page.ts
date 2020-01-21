import { Component } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menu :MenuController,
              private route:Router) {
    this.menu.enable(true);

  }
  Choose_service(service:string){
     this.route.navigate(['offres'],{  queryParams: {service:service} })
  }

}
