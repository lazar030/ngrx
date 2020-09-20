import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { isUndefined } from 'util';
import * as mapboxgl from 'mapbox-gl';
import { Store } from '@ngrx/store';
import { SelectionItem } from 'src/app/shared/models/selection-item.model';
import { AppState } from 'src/app/shared/interfaces/IAppState';
import * as SelectionActions from '../../../store/actions/selection.actions';

@Component({
  selector: 'app-map-items',
  templateUrl: './map-items.component.html',
  styleUrls: ['./map-items.component.scss'],
})
export class MapItemsComponent implements OnInit, OnDestroy, AfterViewInit {
  static readonly unselectedMarkerIcon = '/assets/images/pin/pin-red.svg';
  static readonly unselectedFavMarkerIcon =
    '/assets/images/pin/pin-red-heart.svg';
  static readonly selectedMarkerIcon = '/assets/images/pin/pin-blue.svg';
  static readonly selectedFavMarkerIcon =
    '/assets/images/pin/pin-blue-heart.svg';

  static readonly unselectedCircleIcon = '/assets/images/map-circle-red.svg';
  static readonly unselectedFavCircleIcon =
    '/assets/images/map-circle-red-heart.svg';
  static readonly selectedCircleIcon = '/assets/images/map-circle-blue.svg';
  static readonly selectedFavCircleIcon =
    '/assets/images/map-circle-blue-heart.svg';

  @Output() markerClicked = new EventEmitter<null>();

  @ViewChild('map', { static: true }) map: mapboxgl.Map;

  subscriptions: Array<Subscription> = [];
  rawMap: mapboxgl.Map; //any;
  displayItems: Array<object>;
  showContactInfo: boolean;

  boundsList: any;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit() {
    // this.store
    //   .select('selectionsState')
    //   .pipe(filter((item) => !isUndefined(item)))
    //   .subscribe((item) => {
    //     if (item.previousSelection && !item.currentSelection)
    //       this.unselect(item.previousSelection);
    //     else if (item.currentSelection)
    //       this.processItemClick(item.currentSelection, item.previousSelection);
    //   });
    // this.store.select('layoutState').subscribe((item) => {
    //   if (!this.rawMap || !item || item.subsystem !== 'map') return;
    //   if (
    //     item.message === 'reset-zoom' &&
    //     this.displayItems &&
    //     this.displayItems.length > 0
    //   ) {
    //     this.configurePoi();
    //     this.store.dispatch(SelectionActions.unselect()); //selectionActions.unselect();
    //     const bounds = new mapboxgl.LngLatBounds();
    //     this.displayItems.forEach((dataItem: any) => {
    //       bounds.extend(
    //         new mapboxgl.LngLat(
    //           +dataItem.geocode.Longitude,
    //           +dataItem.geocode.Latitude
    //         )
    //       );
    //       this.rawMap.setCenter({
    //         lng: +dataItem.geocode.Longitude,
    //         lat: +dataItem.geocode.Latitude,
    //       });
    //     });
    //     this.rawMap.fitBounds(bounds);
    //   }
    // });
  }

  onMapReady(map) {
    this.rawMap = map;
    this.setMap();
  }

  /**
   * Temporary solution for fit map bounds.
   */
  fitBounds() {
    // setTimeout(() => {
    // this.rawMap.fitBounds(this.boundsList);
    // }, 200);
  }

  setMap() {
    // let selections = Array<SelectionItem>();
    // this.store.select('resultsState').subscribe((item) => {
    //   if (!item || !item.unfiltered.length) return;
    //   this.showContactInfo = item.showContactInfo;
    //   this.removeMarkers(selections);
    //   selections = Array<SelectionItem>();
    //   this.displayItems = item.DisplayResults();
    //   const bounds = new mapboxgl.LngLatBounds();
    //   this.displayItems.map((dataItem: any) => {
    //     bounds.extend(
    //       new mapboxgl.LngLat(
    //         +dataItem.geocode.Longitude,
    //         +dataItem.geocode.Latitude
    //       )
    //     );
    //     selections.push(
    //       this.loadSelection(dataItem, {
    //         lng: +dataItem.geocode.Longitude,
    //         lat: +dataItem.geocode.Latitude,
    //       })
    //     );
    //   });
    //   this.store.dispatch(SelectionActions.saveSelections({ selections }));
    //   this.store.dispatch(LayoutActions.mapLoadComplete());
    //   this.rawMap.fitBounds(bounds);
    //   this.boundsList = bounds;
    // });
  }

  ngAfterViewInit() {}

  configurePoi() {
    if (this.showContactInfo) return;
    this.rawMap.setLayoutProperty('background', 'visibility', 'none');
  }

  removeMarkers(selections: Array<SelectionItem>): void {
    selections.map((s) => {
      s.gMarker.remove();
    });
  }

  getMarkerIcon(dataItem: SelectionItem, selected: boolean = false) {
    let icon = '';
    if (!this.showContactInfo) {
      if (selected) {
        icon = MapItemsComponent.selectedCircleIcon;
        if (dataItem.favorite) icon = MapItemsComponent.selectedFavCircleIcon;
      } else {
        icon = MapItemsComponent.unselectedCircleIcon;
        if (dataItem.favorite) icon = MapItemsComponent.unselectedFavCircleIcon;
      }
    } else {
      if (selected) {
        icon = MapItemsComponent.selectedMarkerIcon;
        if (dataItem.favorite) icon = MapItemsComponent.selectedFavMarkerIcon;
      } else {
        icon = MapItemsComponent.unselectedMarkerIcon;
        if (dataItem.order > 0)
          icon = icon.replace('.svg', '-' + dataItem.order + '.svg');
        if (dataItem.favorite) icon = MapItemsComponent.unselectedFavMarkerIcon;
      }
    }
    return icon;
  }

  loadSelection(dataItem: any, position: any) {
    // this.rawMap.loadImage(this.getMarkerIcon(dataItem), (error, image) => {
    //   if (error) throw error;
    //   this.rawMap.addImage('custom-marker', image);
    //   this.rawMap.addSource('point', {
    //     'type': 'geojson',
    //     'data': {
    //       'type': 'Feature',
    //       'geometry': {
    //         'type': 'Point',
    //         'coordinates': [
    //           position.lng,
    //           position.lat
    //         ]
    //       },
    //       'properties': {},
    //     }
    //   });
    //   this.rawMap.addLayer({
    //     'id': 'symbols',
    //     'type': 'symbol',
    //     'source': 'point',
    //     'layout': {
    //       'icon-image': 'custom-marker'
    //     }
    //   });
    // }
    // );
    let icon = new Image();
    icon.src = this.getMarkerIcon(dataItem);
    const marker = new mapboxgl.Marker({
      element: icon,
    })
      .setLngLat([position.lng, position.lat])
      .addTo(this.rawMap);

    this.rawMap.on('click', () => {
      this.store.dispatch(SelectionActions.select(dataItem.propertyID));
      this.markerClicked.emit();
    });

    return new SelectionItem(
      dataItem.propertyID,
      position.lat,
      position.lng,
      marker,
      dataItem.favorite,
      dataItem.order
    );
  }

  unselect(selectionItem: SelectionItem) {
    let icon = new Image();
    icon.src = this.getMarkerIcon(selectionItem);
    selectionItem.gMarker._element = icon;
  }

  processItemClick(
    currentSelection: SelectionItem,
    previousSelection: SelectionItem
  ) {
    if (!this.rawMap) {
      return;
    }

    this.rawMap.flyTo({
      center: [currentSelection.lng, currentSelection.lat],
      zoom: 16,
    });

    if (previousSelection) {
      let pIcon = new Image();
      pIcon.src = this.getMarkerIcon(previousSelection);
      previousSelection.gMarker._element = this.getMarkerIcon(
        previousSelection
      );
      let cIcon = new Image();
      cIcon.src = this.getMarkerIcon(currentSelection, true);
      currentSelection.gMarker._element = this.getMarkerIcon(
        currentSelection,
        true
      );
    }
  }
}
