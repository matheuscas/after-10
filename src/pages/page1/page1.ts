import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import localForage from "localforage";
import {GoogleGeocoding} from '../../providers/google-geocoding'
import {CustomLocation} from './location';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers : [GoogleGeocoding]
})
export class Page1 {

  private location: CustomLocation;
  private city_name: String;

  constructor(public navCtrl: NavController, 
                public geocodingService: GoogleGeocoding) {
    this.location = new CustomLocation();
    this.get_geolocation(); 
  }

  set_location(pos: Position){
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    this.location.lat = lat;
    this.location.long = long;
  }

  get_geolocation(){
    
    if (!navigator.geolocation){
      this.city_name = "Geolocation is not supported by your browser";
      return;
    }
    
    let __this = this;
    localForage.getItem('location', function(err, value){
      if(value === null){
        navigator.geolocation.getCurrentPosition((position) =>{
          __this.set_location(position)
          __this.get_geo_city_name();
        }, () => {
          __this.location.city_name = "Unable to retrieve your location";
        });
      }else{
        __this.location = value;
      }
    });
  }

  get_geo_city_name(): void {
    let __this = this;
    this.geocodingService.reverse(this.location.lat, this.location.long).subscribe(
      results => {
        console.log(results)
        this.location.city_name = results[0].address_components[4].long_name;
      },
      err => {
        this.location.city_name = "Sorry, could not find your city. :(";
      },
      () => {
        localForage.setItem('location', __this.location);
      }
    )
  }
}
