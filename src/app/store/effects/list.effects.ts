import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as ResultsActions from '../actions/result.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ListService } from 'src/app/core/services/list.service';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private listService: ListService) {}

  loadList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResultsActions.loadResult),
      mergeMap((action) =>
        this.listService
          .load(action.listID, action.token, action.receipt)
          .pipe(
            map((results) =>
              ResultsActions.loadResultSuccess({ payload: results })
            )
          )
      ),
      catchError((error) => of(ResultsActions.loadResultError({ error })))
    );
  });
}
