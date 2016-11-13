import { API_KEY } from './../../providers/google-services-consts';

export class Place{
    id: string
    location: {lat: number, lng: number}
    icon: string
    name: string
    photo_reference: string
    address: string
    place_id: string
    BASE_URL: string;


    constructor(){
        this.BASE_URL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&";
        this.id = "";
        this.location = {
            lat: 0,
            lng: 0
        }
        this.icon = "";
        this.name = "";
        this.photo_reference = null;
        this.address = "";
        this.place_id = "";
    }

    get_photo_url(): string {
        let ref = "../../assets/no-thumb.jpg";
        if(this.photo_reference !== null){
            return `${this.BASE_URL}photoreference=${this.photo_reference}&key=${API_KEY}`;
        }else{
            return ref;
        }
    }
}