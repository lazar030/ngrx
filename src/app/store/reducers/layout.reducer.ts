import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { ILayoutState } from 'src/app/shared/interfaces/ILayoutState';
import * as LayoutActions from '../actions/layout.actions';

const initialState: ILayoutState = {
  index: null,
  imageIndex: 0,
  images: [],
  isFavSelected: false,
};

const gatLayoutFeatureState = createFeatureSelector<ILayoutState>(
  'layoutState'
);

export const layoutReducer = createReducer<ILayoutState>(
  initialState,
  on(LayoutActions.displayPhoto, (state, action) => {
    return {
      ...state,
      index: action.images.findIndex((item) => {
        action.selectedImageUrl.toLocaleLowerCase() ===
          item.toLocaleLowerCase();
      }),
      subsystem: '',
      message: '',
      images: action.images,
      imageIndex: action.images.findIndex((item) => {
        action.selectedImageUrl.toLocaleLowerCase() ===
          item.toLocaleLowerCase();
      }),
    };
  }),
  on(LayoutActions.hideGallery, (state) => {
    return {
      ...state,
      index: -1,
      subsystem: 'photo-gallery',
      message: 'close',
    };
  }),
  on(LayoutActions.mapResetZoom, (state) => {
    return {
      ...state,
      subsystem: 'map',
      message: 'reset-zoom',
    };
  }),
  on(LayoutActions.mapLoadComplete, (state) => {
    return {
      ...state,
      subsystem: 'map',
      message: 'load-complete',
    };
  }),
  on(LayoutActions.toggleFavFilter, (state, action) => {
    return {
      ...state,
      isFavSelected: action.isFavSelected,
    };
  })
);

export interface ILayoutAction {
  type: string;
  images: Array<string>;
  selectedImageUrl: string;
  isFavSelected: boolean;
}
