import { ISelectionsState } from 'src/app/store/reducers/selection.reducer';
import { ILayoutState } from './ILayoutState';
import { IResultsState } from './IResultsState';

export class AppState {
  selectionsState: ISelectionsState;
  resultsState: IResultsState;
  layoutState: ILayoutState;
}
