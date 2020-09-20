import { SafeResourceUrl } from '@angular/platform-browser';

export interface INgxGalleryImage {
  small?: string | SafeResourceUrl;
  medium?: string | SafeResourceUrl;
  big?: string | SafeResourceUrl;
  description?: string;
  url?: string;
  label?: string;
}
