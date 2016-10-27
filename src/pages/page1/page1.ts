import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import localForage from "localforage";

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  private position: any;
  private city_name: String;

  constructor(public navCtrl: NavController) {
    this.get_location(); 
  }

  get_location(){
    
    this.city_name = "Procurando...";
    if (!navigator.geolocation){
      this.city_name = "Geolocation is not supported by your browser";
      return;
    }
    
    let __this = this;
    localForage.getItem('location').then(function(pos){
      console.log("OFFLINE");
      __this.position = pos;
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      __this.city_name = `${lat}, ${long}`;
    }).catch(function(err){
      console.log(err);
      console.log("ONLINE");
      navigator.geolocation.getCurrentPosition((position) =>{
        __this.position = position;
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        __this.city_name = `${lat}, ${long}`;
        localForage.setItem('location', JSON.stringify(position));
      }, () => {
        __this.city_name = "Unable to retrieve your location";
      });
    });
  }
}
