import { createAction, props } from '@ngrx/store';
import { IDataField } from 'src/app/shared/interfaces/IDataField';

export const save = createAction(
  '[Result Action] Save Results',
  props<{ payload: any }>()
);

export const filter = createAction(
  '[Result Action] Results Filter',
  props<{ filters }>()
);

export const updateField = createAction(
  '[Result Action] Update Property In Item',
  props<{ propertyID: number; data: IDataField }>()
);

export const loadResult = createAction(
  '[Result API] Load List',
  props<{ listID: number; token: string; receipt: string }>()
);

export const loadResultSuccess = createAction(
  '[Result API] Load List Success',
  props<{ payload: any }>()
);

export const loadResultError = createAction(
  '[Result] Load List Error',
  props<{ error: string }>()
);
