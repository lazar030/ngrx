import { IResultsFilter } from './IResultsFilter';

export interface IResultsState {
  showContactInfo: boolean;
  agentInfo: object;
  filters: IResultsFilter;
  unfiltered: Array<object>;
  filtered: Array<object>;
  role?: string;
  error: string;

  DisplayResults(): Array<object>;
}
