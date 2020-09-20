import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GalleryEvent } from 'src/app/shared/interfaces/IGalleryEvent';

@Component({
  selector: 'app-locator-details-photos',
  templateUrl: './locator-details-photos.component.html',
  styleUrls: ['./locator-details-photos.component.scss'],
})
export class LocatorDetailsPhotosComponent implements OnInit {
  @Input() photos: any[] = [];
  @Output() showGallery: EventEmitter<GalleryEvent> = new EventEmitter();

  constructor() {}

  image(src: string) {
    return src.replace('/standard/', '/micros/');
  }

  ngOnInit() {}

  onShowGallery(st: boolean, src: string) {
    this.showGallery.emit({
      visible: st,
      url: src,
    });
  }
}
