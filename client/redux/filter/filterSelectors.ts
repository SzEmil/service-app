import { filterStatusType } from './filterSlice';

export const selectFilterInput = (state: { filter: filterStatusType }) =>
  state.filter.input;
