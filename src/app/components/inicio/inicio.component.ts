import { Component, OnInit } from '@angular/core';
import { MapCustomService } from 'src/app/services/map-custom.service';
import { LocationService } from 'src/app/services/location.service';
import * as mapboxgl from 'mapbox-gl' ;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  constructor(public locationService: LocationService, private mapCustomService: MapCustomService) { }

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat=0;
  lng=0;
  zoom = 15;

  ngOnInit(): void {
    this.buildMap()
  }

  buildMap(): Promise<any> {  
    return new Promise((resolve, reject) => {
      try {
        this.locationService.getPosition().then(pos => {
          this.lat = pos.lat;
          this.lng = pos.lng;
          this.map = new mapboxgl.Map({
          container: 'map',
          zoom: this.zoom,
          style: this.style,
          center: [this.lng, this.lat]
        });
        });
      } catch (e) {
        reject(e);
      }
    });
  }


}
