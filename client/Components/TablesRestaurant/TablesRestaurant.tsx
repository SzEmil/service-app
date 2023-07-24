import React from 'react';
import { tableType } from '../../types/restaurant';

type tableProps = {
  tables: tableType[] | [] | null | undefined;
};
export const TablesRestaurant = ({ tables }: tableProps) => {
  return <div>TablesRestaurant</div>;
};
