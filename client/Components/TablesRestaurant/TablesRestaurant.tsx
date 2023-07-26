import React from 'react';
import { tableType } from '../../types/restaurant';
import css from './TablesRestaurant.module.css';
import { BiSolidDish } from 'react-icons/bi';
import { useState } from 'react';
import { useEffect } from 'react';
import { NewTableForm } from '../TableForm/NewTableForm';
type tableProps = {
  tables: tableType[] | [] | null | undefined;
};
export const TablesRestaurant = ({ tables }: tableProps) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [animateOrders, setAnimateOrders] = useState(false);
  const [isNewTableOpen, setIsNewTableOpen] = useState(false);

  useEffect(() => {
    setAnimateOrders(true);
  }, [selectedTable]);

  const cutDate = (date: string | null | undefined) => {
    const year = date!.slice(0, 10);
    const time = date!.slice(11, 16);

    return `${year}  ${time}`;
  };
  const handleOnClickOpenOrders = (tableId: string) => {
    if (selectedTable === tableId) {
      setSelectedTable(null);
    } else {
      setSelectedTable(tableId);
    }
  };

  return (
    <div>
      <h2>Tables</h2>
      <button onClick={() => setIsNewTableOpen(true)} className={css.button}>
        Add new table
      </button>
      <ul className={css.tablesList}>
        {tables?.map(table => (
          <li
            key={table._id}
            className={`${css.tableBlock} ${
              selectedTable === table._id ? css.open : ''
            }`}
            onClick={() => handleOnClickOpenOrders(table._id)}
          >
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

            <ul
              className={`${css.ordersList} ${
                animateOrders ? css.animateOrders : ''
              }`}
            >
              {table.orders.map((order, index) => (
                <li
                  key={order._id}
                  className={`${css.orderBlock} ${css.orderItem}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h2>{order.name}</h2>
                  <p>Full kcal: {order.fullKcal}</p>
                  <p>Full Price: {order.fullPrice}</p>
                  <ul className={css.dishesList}>
                    {order.dishes.map(dish => (
                      <li key={dish._id} className={css.dishBlock}>
                        <h2>{dish.name}</h2>
                        <p>kcal: {dish.kcal}</p>
                        <p>price: {dish.price}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {isNewTableOpen && (
        <div className={css.newTablesFormWrapper}>
          <div className={css.newFormTablesBlock}>
            <NewTableForm setIsNewTableOpen={setIsNewTableOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
