import React from 'react';
import { tableType } from '../../types/restaurant';
import css from './TablesRestaurant.module.css';
import { BiSolidDish } from 'react-icons/bi';
type tableProps = {
  tables: tableType[] | [] | null | undefined;
};
export const TablesRestaurant = ({ tables }: tableProps) => {
  const cutDate = (date: string | null | undefined) => {
    const year = date!.slice(0, 10);
    const time = date!.slice(11, 16);

    return `${year}  ${time}`;
  };

  return (
    <div>
      <h2>Tables</h2>
      <ul className={css.tablesList}>
        {tables?.map(table => (
          <li key={table._id} className={css.tableBlock}>
            <div className={css.tableInfo}>
              <h2 className={css.tableName}>{table.name}</h2>
              <p className={css.createdAt}>{cutDate(table.createdAt)}</p>
            </div>
            <div className={css.tableInfo}>
              <div className={css.ordersWrapper}>
                <p className={css.ordersCount}>Active orders:</p>
                <div className={css.orderIcon}>
                  <BiSolidDish size={'24px'} />
                </div>
                <p> {table.orders.length}</p>
              </div>
              <p className={css.description}>Note: {table.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
