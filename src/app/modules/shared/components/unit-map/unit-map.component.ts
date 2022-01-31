import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CRS, MapOptions, Map, LatLngTuple, GeoJSON, Polygon} from "leaflet";
import * as L from 'leaflet';
import {Unit} from "../../../../data/types";
import {storroAnimations} from "../../animations";
import {UnitLayer} from "./items/unit-layer.item";
import {UnitsService} from "../../../../api/backend/services/units.service";


@Component({
  selector: 'app-unit-map',
  templateUrl: './unit-map.component.html',
  styleUrls: ['./unit-map.component.scss'],
  animations: storroAnimations
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

  @Input()
  set searchedUnit(searchString: string | null) {
    if (!!this.unitsGeoJSON) {
      this.searchMap(searchString);
    }
  }

  @Output()
  unitPopupOpened: EventEmitter<string | null> = new EventEmitter<string | null>();

  showMap: boolean = false;

  private map?: Map;
  private unitsGeoJSON!: GeoJSON;

  constructor(private unitsService: UnitsService) {
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
    map.on('popupopen', (e: any) => {
      const unitID = e['popup']['_source']['feature']['properties']['id'];

      this.unitPopupOpened.emit(unitID);
    });

    map.on('click', () => {
      this.unitPopupOpened.emit(null);
    })

    this.unitsGeoJSON = this.unitsGeoJSON.addTo(this.map);
    this.fetchUnitGeoJSON(map);
  }

  private searchMap(searchString: string | null) {
    this.showMap = false;
    this.unitsGeoJSON = this.unitsGeoJSON.setStyle((layer: any) => {
      const typedLayer: UnitLayer = layer as UnitLayer;

      if (UnitMapComponent.searchMatch(typedLayer, searchString)) {
        return {
          opacity: 1
        }
      }


      return {
        opacity: 0
      }
    });

    this.showMap = true;
  }

  private setMapAvailability(availability: { [key: string]: boolean }) {
    if (!!this.unit) {
      const unitID = this.unit.id;

      this.unitsGeoJSON = this.unitsGeoJSON.setStyle((layer: any) => {
        if (!!layer.properties) {
          const layerUnitID = layer.properties.id;

          if (layerUnitID !== unitID) {
            return {
              opacity: 0,
              fillOpacity: 0
            }
          }
        }

        return {};
      });
    } else {
      this.unitsGeoJSON = this.unitsGeoJSON.setStyle((layer: any) => {
        if (!!layer.properties) {
          const layerUnitID = layer.properties.id;
          const available = availability[layerUnitID];

          if (!available) {
            return {
              color: 'red'
            }
          }
        }

        return {};
      });
    }
  }

  private bindPopups(map: Map) {
    if (!!this.unit) {
      const unitID = this.unit.id;

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
      });
    }
  }

  private fetchUnitGeoJSON(map: Map) {
    this.unitsService.getUnitsMapDetails().subscribe(response => {
      this.unitsGeoJSON.addData(response.geoJSONObject);
      this.setMapAvailability(response.availability);
      this.bindPopups(map);

      setTimeout(() => {
        this.showMap = true;
      }, 800);
    });
  }

  private static searchMatch(typedLayer: UnitLayer, partialID: string | null) {
    if (partialID === null || partialID.length === 0) {
      return true;
    } else if (!!typedLayer && !!typedLayer.properties) {
      const unitID = typedLayer.properties.id;

      return unitID.includes(partialID);
    }

    return false;
  }
}
