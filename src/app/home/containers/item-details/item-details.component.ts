import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isNotNullOrUndefined } from 'src/app/shared/utils/rxjs.helper';
import { AppState } from 'src/app/shared/interfaces/IAppState';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  role;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  load(): void {
    this.store
      .select('selectionsState')
      .pipe(isNotNullOrUndefined())
      .subscribe((data: any) => {
        this.role = data.role;
      });
  }
}
