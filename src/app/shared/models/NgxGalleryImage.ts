import { SafeResourceUrl } from '@angular/platform-browser';
import { INgxGalleryImage } from '../interfaces/INgxGalleryImage';

export declare class NgxGalleryImage implements INgxGalleryImage {
  small?: string | SafeResourceUrl;
  medium?: string | SafeResourceUrl;
  big?: string | SafeResourceUrl;
  description?: string;
  url?: string;
  label?: string;
  constructor(obj: INgxGalleryImage);
}
