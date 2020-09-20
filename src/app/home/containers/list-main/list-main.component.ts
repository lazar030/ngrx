import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDrawer } from '@angular/material/sidenav';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { animationShow } from 'src/app/shared/utils/animations';
import { NgxGalleryImage } from 'src/app/shared/models/NgxGalleryImage';
import { XS_SCREEN } from 'src/app/shared/constants/screen';
import { AppState } from 'src/app/shared/interfaces/IAppState';
import { getLoadedResult } from 'src/app/store/reducers/result.reducer';
import { MapItemsComponent } from '../../components/map-items/map-items.component';
import * as LayoutActions from '../../../store/actions/layout.actions';
import * as ResultsActions from '../../../store/actions/result.actions';

@Component({
  selector: 'app-list-main',
  templateUrl: './list-main.component.html',
  styleUrls: ['./list-main.component.scss'],
  animations: [animationShow],
})
export class ListMainComponent implements OnInit, OnDestroy {
  galleryImages: NgxGalleryImage[];
  subscriptions: Array<Subscription> = [];

  @ViewChild('drawer', { static: true })
  drawer: MatDrawer;

  @ViewChild('mapRef', { static: true })
  mapRef: MapItemsComponent;

  showWelcome: 'never' | 'show' | 'shown' = 'never';
  showAlbum = false;
  showMap = true;
  showSideNav = true;
  mobileVersion = false;
  showExpandButton = false;
  screenWidth = 0;
  mapOpened = false;
  results$: Observable<any>;
  error$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.showWelcome === 'show') {
      return;
    }

    this.manageSlider(window.innerWidth);
  }

  private manageSlider(width: number) {
    this.screenWidth = width;
    if (this.screenWidth < XS_SCREEN) {
      if (!this.mobileVersion) {
        this.mobileVersion = true;
      }
    } else if (this.screenWidth >= XS_SCREEN) {
      this.mapOpened = false;
      this.mobileVersion = false;
      this.showExpandButton = false;

      if (this.drawer && !this.drawer.opened) {
        this.drawer.toggle();
      }
      if (this.mapRef) {
        this.mapRef.fitBounds();
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  scrollToTop() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const contentContainer =
          <any>(
            document.querySelector(
              '.mat-sidenav.mat-sidenav-opened.mat-sidenav-side'
            )
          ) || window;
        contentContainer.scrollTop = 0;
      });
  }

  ngOnInit() {
    this.results$ = this.store.select(getLoadedResult);

    this.manageSlider(window.innerWidth);
    this.scrollToTop();
    this.loadList();

    this.results$.subscribe((item) => {
      if (
        item &&
        item.subsystem === 'map' &&
        item.message === 'load-complete'
      ) {
        this.onMapLoaded();
      }

      if (
        item &&
        item.subsystem === 'photo-gallery' &&
        item.message === 'close'
      ) {
        this.hideGallery();
      }

      if (!item || item.index == null) return;

      if (item.index < 0) {
        this.showAlbum = false;
        this.showMap = true;
        return;
      }

      this.showWelcome = 'shown';
      this.showAlbum = true;
      this.showMap = false;
    });

    this.galleryImages = [];

    this.results$
      .pipe(filter((data) => data && data.photos && data.photos.length))
      .subscribe((data: any) => {
        this.configureGallery(data.photos);
      });

    this.results$
      .pipe(
        filter(
          (item) => !item && !item.currentSelection
          // !isNullOrUndefined(item) &&
          // !isNullOrUndefined(item.currentSelection)
        )
      )
      .subscribe((item) => {
        this.router.navigate([item.currentSelection.propertyID], {
          relativeTo: this.route,
        });
      });
  }

  onToggle(opened: boolean) {
    if (!this.showMap) {
      this.showMap = true;
    }
    this.mapOpened = opened;
    if (opened && this.mapRef) {
      this.mapRef.fitBounds();
    }
    this.showExpandButton = false;
  }

  onMapZoomedIn() {
    if (this.showSideNav) {
      this.showExpandButton = true;
    }

    if (this.mobileVersion && this.drawer && !this.drawer.opened) {
      this.mapOpened = false;
      this.showExpandButton = false;
      this.drawer.toggle();
    }
  }

  onExpandMap() {
    if (this.mapRef) {
      this.mapRef.fitBounds();
      this.showExpandButton = false;
    }
  }

  private configureGallery(photos) {
    this.galleryImages = [];
    photos.forEach((url) => {
      this.galleryImages = this.galleryImages.concat({
        small: url.replace('/standard/', '/micros/'),
        medium: url.replace('/standard/', '/previews/'),
        big: url,
      });
    });
  }

  private loadList() {
    if (
      !this.route.snapshot.paramMap.has('listID') ||
      !this.route.snapshot.paramMap.has('token')
    ) {
      return;
    }

    this.store.dispatch(
      ResultsActions.loadResult({
        listID: +this.route.snapshot.paramMap.get('listID'),
        token: this.route.snapshot.paramMap.get('token'),
        receipt: this.route.snapshot.queryParams['receipt'],
      })
    );
  }

  onMapLoaded() {
    this.store.dispatch(LayoutActions.mapResetZoom());

    if ('receipt' in this.route.parent.snapshot.queryParams) {
      this.showSideNav = false;
      if (this.showWelcome === 'never') {
        this.showSplashScreen();
      } else {
        this.showWelcome = 'shown';
      }
    }
  }

  hideGallery() {
    this.showWelcome = 'shown';
    this.showAlbum = false;
    this.showMap = true;
  }

  private showSplashScreen() {
    this.showMap = false;
    this.showWelcome = 'show';
  }

  closeSplashScreen() {
    this.showWelcome = 'shown';
    this.showSideNav = true;
    this.showMap = true;

    setTimeout(() => {
      this.drawer.toggle();
    }, 200);

    this.manageSlider(window.innerWidth);

    if (this.showMap && this.mapRef) {
      this.mapRef.fitBounds();
    }
  }

  get needToShowGallery() {
    return !this.showMap && this.showWelcome !== 'show';
  }

  get needToShowMenuIcon() {
    return (
      this.mobileVersion &&
      !this.showAlbum &&
      this.mapOpened &&
      this.showWelcome !== 'show'
    );
  }

  get needToShowMapIcon() {
    return (
      this.mobileVersion &&
      !this.showAlbum &&
      !this.mapOpened &&
      this.showWelcome !== 'show'
    );
  }

  get needToShowExpandMapIcon() {
    return this.mobileVersion && this.showExpandButton && !this.showAlbum;
  }
}
