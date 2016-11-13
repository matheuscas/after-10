import { Place } from './place.model';
import { GooglePlacesService } from './../../providers/google-places.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import localForage from "localforage";
import {GoogleGeocoding} from '../../providers/google-geocoding.service'
import {CustomLocation} from './location.model';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers : [GoogleGeocoding, GooglePlacesService]
})
export class Page1 {

  private location: CustomLocation;
  private city_name: String;
  private places: Array<Place>;

  constructor(
    public navCtrl: NavController,
    public geocodingService: GoogleGeocoding,
    public placesService: GooglePlacesService
  ) {
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

    let self = this;
    localForage.getItem('location', function(err, value: CustomLocation){
      if(value === null){
        navigator.geolocation.getCurrentPosition((position) =>{
          self.set_location(position)
          self.get_geo_city_name();
          self.searchPlaces(self.location.lat, self.location.long);
        }, () => {
          self.location.city_name = "Unable to retrieve your location";
        });
      }else{
        self.location = value;
        self.searchPlaces(self.location.lat, self.location.long);
      }
    });
  }

  get_geo_city_name(): void {
    let self = this;
    this.geocodingService.reverse(this.location.lat, this.location.long).subscribe(
      results => {
        console.log(results)
        this.location.city_name = results[0].address_components[4].long_name;
      },
      err => {
        this.location.city_name = "Sorry, could not find your city. :(";
      },
      () => {
        localForage.setItem('location', self.location);
      }
    )
  }

  searchPlaces(lat, lng, radius=500){
    let self = this;
    this.placesService.nearbySearch(lat, lng, radius)
    .subscribe(
      results => {
        self.places = results;
      },
      err => {
        self.places = [];
        console.log(err);
      }
    )
  }
}
