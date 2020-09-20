import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PropertyService } from 'src/app/core/services/property.service';
import { AppState } from 'src/app/shared/interfaces/IAppState';
import * as LayoutActions from '../../../store/actions/layout.actions';

@Component({
  selector: 'app-item-gallery',
  templateUrl: './item-gallery.component.html',
  styleUrls: ['./item-gallery.component.scss'],
})
export class ItemGalleryComponent implements OnInit {
  property$;
  propertyData;

  constructor(
    private propertyService: PropertyService,
    private store: Store<AppState>
  ) {}

  ngOnDestroy() {
    this.property$.unsubscribe();
  }

  ngOnInit() {
    this.property$ = this.propertyService.subscription.subscribe(
      (data: any) => {
        if (!data) return;

        this.propertyData = data;
      }
    );
  }

  showGallery(url) {
    this.store.dispatch(
      LayoutActions.displayPhoto({
        selectedImageUrl: url.replace('/previews/', '/standard/'),
        images: this.propertyData.photos,
      })
    );
  }
}
