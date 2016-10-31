import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the GoogleGeocoding provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleGeocoding {

  geocoder: any;
  API_KEY : String;
  BASE_URL: String;

  constructor(public http: Http) {
    this.API_KEY = "AIzaSyCt8OBeX5yUVoaEj8PN5GLXHbOSVqg2Pxw";
    this.BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
  }

  private extract_data(res: Response){
    let body = res.json();
    return body.results || { };
  }

  reverse(latitude: Number, longitude: Number): Observable<any> {

    let url = `${this.BASE_URL}?latlng=${latitude},${longitude}&key=${this.API_KEY}`;

    return this.http.get(url)
                .map(this.extract_data)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
