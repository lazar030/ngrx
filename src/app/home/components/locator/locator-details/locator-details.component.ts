import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { LoggingService } from 'src/app/core/LoggingService';
import { ListService } from 'src/app/core/services/list.service';
import { PropertyService } from 'src/app/core/services/property.service';
import { GalleryEvent } from 'src/app/shared/interfaces/IGalleryEvent';
import { PropertyModel } from 'src/app/shared/models/property.model';
import { isNotNullOrUndefined } from 'src/app/shared/utils/rxjs.helper';
import { AppState } from 'src/app/shared/interfaces/IAppState';
import * as LayoutActions from '../../../../store/actions/layout.actions';
import * as SelectionActions from '../../../../store/actions/selection.actions';

@Component({
  selector: 'app-locator-details',
  templateUrl: './locator-details.component.html',
  styleUrls: ['./locator-details.component.scss'],
})
export class LocatorDetailsComponent implements OnInit {
  static readonly MAX_NOTES_LENGTH = 130;

  subscriptions: Array<Subscription> = [];

  propertyID;
  propertyData: PropertyModel = null;
  agentInfo;

  isNotesExpanded;
  isSchoolsVisible;
  isGalleryVisible;
  displayFloorplans = [];
  showAllAmenities;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private loggingService: LoggingService,
    private listService: ListService,
    private store: Store<AppState>
  ) {}

  get phone(): any {
    return this.propertyData && this.propertyData.phone
      ? `tel:${this.propertyData.phone
          .replace('(', '')
          .replace('-', '')
          .replace(')', '')
          .trim()}`
      : '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.route.params))
      .subscribe((params) => {
        this.propertyID = +params.propertyID;
        this.propertyService.load(
          this.listService.ListID,
          this.propertyID,
          this.listService.Token
        );
      });

    // todo: move this to a route resolver
    if (!this.listService || !this.listService.IsReady) {
      this.loadList();
    } else {
      this.agentInfo = this.listService.AgentInfo;
    }

    // todo: move to route resolver.
    this.loadProperty();
    this.loadGallery();
  }

  public goBack() {
    this.router
      .navigate(['../'], {
        relativeTo: this.route,
        fragment: 'p-' + this.propertyID.toString(),
      })
      .then(() => {
        this.store.dispatch(LayoutActions.mapResetZoom());
      });
  }

  private loadProperty(): any {
    this.propertyService.subscription
      .pipe(isNotNullOrUndefined())
      .subscribe((data: any) => {
        if (data.error) {
          this.router.navigate(['/access-denied']);
          return;
        }

        this.propertyData = data;
        this.displayFloorplans = this.propertyData.floorplans; // todo: apply filter here.
        this.propertyData.displayNotes = this.propertyData.notes;
        if (
          this.propertyData.displayNotes.length >
          LocatorDetailsComponent.MAX_NOTES_LENGTH
        )
          this.propertyData.displayNotes =
            this.propertyData.notes.substring(
              0,
              LocatorDetailsComponent.MAX_NOTES_LENGTH
            ) + '...';

        if (this.propertyData.highValueAmenities.length === 0)
          this.showAllAmenities = true;
      });
  }

  private loadGallery() {
    this.store
      .select((state) => state.layoutState)
      .pipe(filter((item) => !item && !item.index))

      .subscribe((item) => (this.isGalleryVisible = item.index >= 0));
  }

  private loadList() {
    this.store
      .select('resultsState')
      .pipe(isNotNullOrUndefined())
      .subscribe(() => {
        this.store.dispatch(SelectionActions.select(this.propertyID));
        this.agentInfo = this.listService.AgentInfo;
      });
  }

  showRemainingAmenities() {
    this.showAllAmenities = true;
  }

  expandNotes() {
    this.propertyData.displayNotes = this.propertyData.notes;
    this.isNotesExpanded = true;
  }

  showGallery(data: GalleryEvent) {
    if (!data.visible) {
      this.store.dispatch(LayoutActions.hideGallery());
      return;
    }

    if (data.url) data.url = data.url.replace('/micros/', '/standard/');
    else data.url = this.propertyData.photos[0];

    this.store.dispatch(
      LayoutActions.displayPhoto({
        selectedImageUrl: data.url,
        images: this.propertyData.photos,
      })
    );
  }

  toggleFloorplanPhoto(floorplan) {
    if (this.displayFloorplans.length === 1) {
      this.displayFloorplans = [].concat(this.propertyData.floorplans);
    } else if (floorplan.photoUrl !== '') {
      this.displayFloorplans = [].concat(floorplan);
    }
  }

  toggleFav(state: boolean) {
    this.propertyData.favorite = state;
    //this.subscriptions.push(
    this.listService
      .toggleFavorite(this.propertyID, this.propertyData.favorite)
      .subscribe(
        () => {},
        (error) => {
          this.loggingService.logException(
            'ListItemDetailsComponent.toggleFav()',
            '',
            error
          );
        }
      );
    //);
  }
}
