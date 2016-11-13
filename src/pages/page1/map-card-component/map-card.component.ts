import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: "map-card",
    templateUrl: "./map-card.component.html"
})
export class MapCardComponent implements OnInit {
    @Input() place_name: string;
    @Input() place_address: string;
    @Input() place_img: string;

    constructor() { }

    ngOnInit() { }
}