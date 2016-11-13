import { Place } from './../pages/page1/place.model';
import { API_KEY } from './google-services-consts';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GooglePlaces provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.

  https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=YOUR_API_KEY
  SEE: https://developers.google.com/places/web-service/
*/

@Injectable()
export class GooglePlacesService{
  BASE_URL: string;

  constructor(public http: Http) {
    this.BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance";
  }

  nearbySearch(lat: Number, lng: Number, radius:Number): Observable<any>{

    let url = `${this.BASE_URL}&location=${lat},${lng}&radius=${radius}&types=pharmacy&key=${API_KEY}`;
    console.log(url);

    return this.http.get(url)
                .map(this.extract_data)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extract_data(res: Response){
    let body = res.json();
    let place = new Place();
    place.id = body.results.id;
    place.location.lat = body.results.geometry.location.lat
    place.location.lng = body.results.geometry.location.lng
    place.icon = body.results.icon;
    place.name = body.results.name;
    place.photo_reference = body.results.photos[0].photo_reference;
    place.address = body.results.vicinity;
    place.place_id = body.results.place_id;
    console.log(place)
    return place
  }

}
