import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './core/footer/footer.component';
import { AccessDeniedComponent } from './core/access-denied/access-denied.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ListItemsComponent } from './home/components/list-items/list-items.component';
import { ExpandMapSwitchComponent } from './home/components/expand-map-switch/expand-map-switch.component';
import { MapSwitchComponent } from './home/components/map-switch/map-switch.component';
import { MapItemsComponent } from './home/components/map-items/map-items.component';
import { TipServiceComponent } from './home/components/tip-service/tip-service.component';
import { ItemGalleryComponent } from './home/components/item-gallery/item-gallery.component';
import { ItemDetailsComponent } from './home/containers/item-details/item-details.component';
import { ImageBigViewComponent } from './home/components/image-big-view/image-big-view.component';
import { ImageArrowComponent } from './home/components/image-arrow/image-arrow.component';
import { ListMainComponent } from './home/containers/list-main/list-main.component';
import { VendorItemComponent } from './home/components/vendor/vendor-item/vendor-item.component';
import { LocatorItemComponent } from './home/components/locator/locator-item/locator-item.component';
import { LocatorDetailsComponent } from './home/components/locator/locator-details/locator-details.component';
import { VendorDetailsComponent } from './home/components/vendor/vendor-details/vendor-details.component';
import { ListFilterBedroomComponent } from './home/components/filters/bedroom/bedroom.component';
import { FavoriteComponent } from './home/components/filters/favorite/favorite.component';
import { ListFilterPriceComponent } from './home/components/filters/price/price.component';
import { LocatorDetailsAmenitiesComponent } from './home/components/locator/locator-details/locator-details-amenities/locator-details-amenities.component';
import { LocatorDetailsExtraInfoComponent } from './home/components/locator/locator-details/locator-details-extra-info/locator-details-extra-info.component';
import { LocatorDetailsFaviconComponent } from './home/components/locator/locator-details/locator-details-favicon/locator-details-favicon.component';
import { LocatorDetailsFloorplansComponent } from './home/components/locator/locator-details/locator-details-floorplans/locator-details-floorplans.component';
import { LocatorDetailsLinksComponent } from './home/components/locator/locator-details/locator-details-links/locator-details-links.component';
import { LocatorDetailsNotesComponent } from './home/components/locator/locator-details/locator-details-notes/locator-details-notes.component';
import { LocatorDetailsPhotosComponent } from './home/components/locator/locator-details/locator-details-photos/locator-details-photos.component';
import { LocatorDetailsSpecialsComponent } from './home/components/locator/locator-details/locator-details-specials/locator-details-specials.component';
import { LocatorDetailsSubheadingComponent } from './home/components/locator/locator-details/locator-details-subheading/locator-details-subheading.component';
import { VendorDetailsManagerComponent } from './home/components/vendor/vendor-details-manager/vendor-details-manager.component';
import { VendorDetailsRegionalComponent } from './home/components/vendor/vendor-details-regional/vendor-details-regional.component';
import { layoutReducer } from './store/reducers/layout.reducer';
import { resultReducer } from './store/reducers/result.reducer';
import { selectionsReducer } from './store/reducers/selection.reducer';
import { ListEffects } from './store/effects/list.effects';
import { ListService } from './core/services/list.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AccessDeniedComponent,
    ListMainComponent,
    ListItemsComponent,
    VendorItemComponent,
    LocatorItemComponent,
    ExpandMapSwitchComponent,
    MapSwitchComponent,
    MapItemsComponent,
    TipServiceComponent,
    ItemGalleryComponent,
    ItemDetailsComponent,
    LocatorDetailsComponent,
    VendorDetailsComponent,
    ImageBigViewComponent,
    ImageArrowComponent,

    ListItemsComponent,
    MapItemsComponent,
    ListMainComponent,
    ListFilterBedroomComponent,
    ListFilterPriceComponent,
    FavoriteComponent,
    FooterComponent,
    VendorItemComponent,
    LocatorDetailsComponent,
    VendorDetailsComponent,
    LocatorDetailsLinksComponent,
    LocatorDetailsSubheadingComponent,
    LocatorDetailsPhotosComponent,
    LocatorDetailsFaviconComponent,
    LocatorDetailsNotesComponent,
    LocatorDetailsSpecialsComponent,
    LocatorDetailsFloorplansComponent,
    LocatorDetailsExtraInfoComponent,
    LocatorDetailsAmenitiesComponent,
    VendorDetailsManagerComponent,
    VendorDetailsRegionalComponent,
    ImageBigViewComponent,
    ImageArrowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule,
    StoreModule.forRoot({
      selectionsState: selectionsReducer,
      layoutState: layoutReducer,
      resultsState: resultReducer,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Smart App Dev Tool',
      maxAge: 50,
    }),
    EffectsModule.forRoot([ListEffects]),
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1Ijoia3JzdGljbWlsYW4iLCJhIjoiY2tlbzNuenlqMjN5ajJzcGNlaTNiYXlpayJ9.SoL71Zyf7SmLrVYWC7fQ',
    }),
  ],
  providers: [ListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
