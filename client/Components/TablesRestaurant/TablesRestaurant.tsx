import React from 'react';
import { tableType } from '../../types/restaurant';
import css from './TablesRestaurant.module.css';
import { BiSolidDish } from 'react-icons/bi';
import { useState } from 'react';
import { useEffect } from 'react';
import { NewTableForm } from '../NewTableForm/NewTableForm';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { completeOrder } from '../../redux/restaurants/restaurantsOperations';
import { orderType } from '../../types/restaurant';
import { EditOrderForm } from '../EditOrderForm/EditOrderForm';
import { EditTableForm } from '../EditTableForm/EditTableForm';
import { nanoid } from 'nanoid';

type tableProps = {
  tables: tableType[] | [] | null | undefined;
};
export const TablesRestaurant = ({ tables }: tableProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [animateOrders, setAnimateOrders] = useState(false);
  const [isNewTableOpen, setIsNewTableOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<orderType>();
  const [isEditOrderMenuOpen, setIsEditOrderMenuOpen] = useState(false);

  const [isEditTableOpen, setIsEditTableOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState<tableType>();

  const [orderOpen, setOrderOpen] = useState(false);
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
      setOrderOpen(false);
    } else {
      setSelectedTable(tableId);
      setOrderOpen(true);
    }
  };

  const handleOnClickCompleteOrder = (
    orderId: string | undefined,
    tableId: string
  ) => {
    const { restaurantId } = router.query;

    const completeOrderData = {
      restaurantId,
      orderData: { orderId, tableId },
    };

    dispatch(completeOrder(completeOrderData));
  };

  const handleOnClickEditOrder = async (orderData: orderType) => {
    await setCurrentOrder(orderData);

    if (currentOrder) setIsEditOrderMenuOpen(true);
  };

  const handleOnClickEditTable = async (tableData: tableType) => {
    await setCurrentTable(tableData);

    setIsEditTableOpen(true);
  };

  return (
    <div>
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
          >
            <div className={css.tableInfo}>
              <div>
                <h2 className={css.tableName}>{table.name}</h2>
                <button onClick={() => handleOnClickEditTable(table)}>
                  Edit table
                </button>
                <button>Finish table</button>
              </div>
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
                  <div className={css.orderHeaderBtnWrapper}>
                    <h2>{order.name}</h2>
                    <div>
                      <button
                        onClick={() => handleOnClickEditOrder(order)}
                        className={css.button}
                      >
                        Edit order
                      </button>
                      <button
                        onClick={() =>
                          handleOnClickCompleteOrder(order._id, table._id)
                        }
                        className={css.buttonOrder}
                      >
                        Complete order
                      </button>
                    </div>
                  </div>
                  <p>Full kcal: {order.fullKcal}</p>
                  <p>Full Price: {order.fullPrice}</p>
                  <ul className={css.dishesList}>
                    {order.dishes.map(dish => (
                      <li
                        key={`${dish._id}_${nanoid()}`}
                        className={css.dishBlock}
                      >
                        <h2>{dish.name}</h2>
                        <p>kcal: {dish.kcal}</p>
                        <p>price: {dish.price}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button
              className={css.btnShowMore}
              onClick={() => handleOnClickOpenOrders(table._id)}
            >
              {orderOpen && selectedTable === table._id ? (
                <span>Hide details</span>
              ) : !orderOpen && selectedTable !== table._id ? (
                <span>Show details</span>
              ) : (
                <span>Show details</span>
              )}
            </button>
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

      {isEditOrderMenuOpen && (
        <div className={css.newTablesFormWrapper}>
          <div className={css.newFormTablesBlock}>
            <EditOrderForm
              setIsEditOrderMenuOpen={setIsEditOrderMenuOpen}
              currentOrder={currentOrder}
            />
          </div>
        </div>
      )}

      {isEditTableOpen && (
        <div className={css.newTablesFormWrapper}>
          <div className={css.newFormTablesBlock}>
            <EditTableForm
              setIsEditTableOpen={setIsEditTableOpen}
              currentTable={currentTable}
            />
          </div>
        </div>
      )}
    </div>
  );
};
