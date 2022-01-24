import {Component, Input, OnInit} from '@angular/core';
import {CRS, MapOptions, Map, LatLngTuple, GeoJSON, Polygon} from "leaflet";
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import {GeoJSONObject, Unit} from "../../../../data/types";


@Component({
  selector: 'app-unit-map',
  templateUrl: './unit-map.component.html',
  styleUrls: ['./unit-map.component.scss']
})
export class UnitMapComponent implements OnInit {

  @Input()
  unit?: Unit;

  mapOptions: MapOptions = {
    minZoom: -3,
    maxZoom: 1,
    zoom: -3,
    crs: CRS.Simple
  };

  private map?: Map;
  private unitsGeoJSON!: GeoJSON;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.unitsGeoJSON = L.geoJSON();
  }

  onMapReady(map: Map) {
    this.map = map;

    if (!this.unit) {
      map.setView([0, 0], 0);
    }

    const mapBackgroundURL = 'assets/map/cordova/building-outline.svg';
    const mapBackgroundBounds: LatLngTuple[] = [[-1283, -2000], [2564, 4000]];

    L.imageOverlay(mapBackgroundURL, mapBackgroundBounds).addTo(map);

    map.setMaxBounds(mapBackgroundBounds);
    map.fitBounds(mapBackgroundBounds);


    this.unitsGeoJSON = this.unitsGeoJSON.addTo(this.map);
    this.fetchUnitGeoJSON(map);
  }

  private fetchUnitGeoJSON(map: Map) {
    this.httpClient.get<GeoJSONObject>('assets/map/cordova/storage-unit-layout.geojson').subscribe(geoJSON => {
      this.unitsGeoJSON.addData(geoJSON);

      if (!!this.unit) {
        const unitID = this.unit.id;

        this.unitsGeoJSON = this.unitsGeoJSON.setStyle((layer: any) => {
          if (!!layer.properties) {
            const layerUnitID = layer.properties.id;

            if (layerUnitID === unitID) {
              return {
                opacity: 1.0
              }
            }
          }


          return {
            opacity: 0.1,
            fillOpacity: 0.1,
            color: 'red'
          }
        });


          this.unitsGeoJSON.getLayers().forEach((layer: any) => {
            if (!!layer['feature'] && !!layer['feature'].properties && unitID === layer['feature'].properties.id) {
              layer.bindPopup((layer: any) => `Unit ${layer['feature'].properties.id}`, {
                closeOnClick: false,
                closeOnEscapeKey: true,
                closeButton: false
              });
              (layer as Polygon).openPopup(layer.getBounds().getCenter());
              map.setView(layer.getBounds().getCenter(), -2);
            }
          });
      } else {
        this.unitsGeoJSON.getLayers().forEach((layer: any) => {
          layer.bindPopup((layer: any) => `Unit ${layer['feature'].properties.id}`);
        })
      }
    });
  }
}
