import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
// import { ResultsActions } from '../../../store/actions/results.actions';
import * as ResultsActions from '../../../../store/actions/result.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/interfaces/IAppState';

@Component({
  selector: 'app-list-filter-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class ListFilterPriceComponent implements OnInit, OnChanges {
  @Input() min;
  @Input() max;
  @Input() current;

  @Output() change = new EventEmitter();
  @ViewChild('maxRentSlider', { static: true }) slider;

  constructor(
    //private resultsActions: ResultsActions
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('max' in changes) {
      this.slider.min = this.min;
      this.slider.value = this.current;
      if (this.max > this.slider.max) this.slider.max = this.max;
    }
  }

  apply(max: number) {
    //this.resultsActions.filter({ maxPrice: max });
    this.store.dispatch(ResultsActions.filter({ filters: max }));
    this.change.emit(max);
  }
}
