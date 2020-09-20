import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { IDataField } from 'src/app/shared/interfaces/IDataField';
import { IResultsFilter } from 'src/app/shared/interfaces/IResultsFilter';
import { IResultsState } from 'src/app/shared/interfaces/IResultsState';
import * as ResoultActions from '../actions/result.actions';

const initialState: IResultsState = {
  filters: null,
  unfiltered: [],
  filtered: [],
  showContactInfo: false,
  agentInfo: null,
  role: '',
  error: '',

  DisplayResults(): Array<object> {
    return !this.filters ? this.unfiltered : this.filtered;
  },
};

const getSelectionFeatureState = createFeatureSelector<IResultsState>(
  'resultsState'
);

export const getLoadedResult = createSelector(
  getSelectionFeatureState,
  (state) => state
);

function getFilteredSelections(
  filters: IResultsFilter,
  results: Array<any>
): Array<object> {
  if (!results) return;

  let bedrooms = [0, 1, 2, 3];
  let maxPrice = Number.MAX_SAFE_INTEGER;
  if (filters.bedrooms) bedrooms = filters.bedrooms;
  if (filters.maxPrice) maxPrice = filters.maxPrice;

  const filtered = [];
  results.forEach((record) => {
    const clone = { ...record };

    clone.floorplans = [];
    bedrooms.forEach((bedroom) => {
      const matches = record.floorplans.filter(
        (f) => f.bedrooms === bedroom && f.price <= maxPrice
      );
      if (matches.length) clone.floorplans = clone.floorplans.concat(matches);
    });

    if (filters.favorite && !clone.favorite) {
      // skip
    } else if (clone.floorplans.length) filtered.push(clone);
  });

  return filtered;
}

function updateDataField(
  dataset: Array<object>,
  data: IDataField,
  propertyID: number
) {
  const h = [].concat(dataset);
  const index = h.findIndex((r) => r.propertyID === propertyID);
  if (index < 0) return dataset;

  const item = h[index];
  item[data.name] = data.value;
  h[index] = item;

  return h;
}

export const resultReducer = createReducer<IResultsState>(
  initialState,
  on(
    ResoultActions.filter,
    (state, action): IResultsState => {
      return {
        ...state,
        filters: { ...state.filters, ...action.filters },
        filtered: getFilteredSelections(action.filters, state.unfiltered),
      };
    }
  ),
  on(ResoultActions.save, (state, action) => {
    return {
      ...state,
      filters: null,
      filtered: [],
      unfiltered: action.payload.records,
      showContactInfo: action.payload.showContactInfo,
      agentInfo: action.payload.agentInfo,
      role: action.payload.role,
    };
  }),
  on(ResoultActions.updateField, (state, action) => {
    if (!action.data || action.propertyID <= 0) return { ...state };
    const filtered = updateDataField(
      state.filtered,
      action.data,
      action.propertyID
    );
    const unfiltered = updateDataField(
      state.unfiltered,
      action.data,
      action.propertyID
    );
    return {
      ...state,
      filtered: filtered,
      unfiltered: unfiltered,
    };
  }),
  on(ResoultActions.loadResult, (state) => {
    return {
      ...state,
    };
  }),
  on(ResoultActions.loadResultSuccess, (state, action) => {
    return {
      ...state,
      filters: null,
      filtered: [],
      unfiltered: action.payload.records,
      showContactInfo: action.payload.showContactInfo,
      agentInfo: action.payload.agentInfo,
      role: action.payload.role,
    };
  }),
  on(ResoultActions.loadResultError, (state, action) => {
    return {
      ...state,
      filters: null,
      filtered: [],
      unfiltered: [],
      error: action.error,
    };
  }),
  on(ResoultActions.updateField, (state, action) => {
    if (!action.data || action.propertyID <= 0) return { ...state };
    const filtered = updateDataField(
      state.filtered,
      action.data,
      action.propertyID
    );
    const unfiltered = updateDataField(
      state.unfiltered,
      action.data,
      action.propertyID
    );
    return {
      ...state,
      filtered: filtered,
      unfiltered: unfiltered,
    };
  })
);
