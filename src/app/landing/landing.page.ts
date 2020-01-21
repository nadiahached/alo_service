import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private router: Router,
              private menu :MenuController,
  ) {
    this.menu.enable(false);

  }

  ngOnInit() {
  }
  Login(){
    this.router.navigate(['/login']);
  }
  Register(){
    this.router.navigate(['/register']);
  }

}
