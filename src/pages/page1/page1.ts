import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import localForage from "localforage";

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  private location: any;
  private city_name: String;

  constructor(public navCtrl: NavController) {
    this.location = {
        "lat": 0,
        "long" : 0,
        "city_name": "Procurando..."
    };
    this.get_location(); 
  }

  set_location(pos: Position){
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    this.location = {
        "lat": lat,
        "long" : long,
        "city_name": `${lat}, ${long}`
    };
  }

  get_location(){
    
    if (!navigator.geolocation){
      this.city_name = "Geolocation is not supported by your browser";
      return;
    }
    
    let __this = this;
    localForage.getItem('location').then(function(pos){
      __this.location = pos;
    }).catch(function(err){
      navigator.geolocation.getCurrentPosition((position) =>{
        __this.set_location(position)
        localForage.setItem('location', __this.location);
      }, () => {
        __this.location.city_name = "Unable to retrieve your location";
      });
    });
  }
}
