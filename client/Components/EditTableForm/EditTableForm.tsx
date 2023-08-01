import { useSelector } from 'react-redux';
import { selectCurrentRestaurantMenu } from '../../redux/restaurants/restaurantsSelectors';
import { dishType } from '../../types/restaurant';
import { orderType } from '../../types/restaurant';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import styles from './EditTableForm.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { FormEvent } from 'react';
import { updateRestaurantTable } from '../../redux/restaurants/restaurantsOperations';
import { selectCurrentRestaurantCurrency } from '../../redux/restaurants/restaurantsSelectors';

type setOrderType = {
  _id?: string | undefined;
  name: string;
  dishes: dishType[] | [];
};

export type editRestaurantTableType = {
  table: {
    tableId: string;
    name: string;
    description: string;
    orders: orderType[];
    ordersToDelete: string[];
  };
  restaurantId: string | string[] | undefined;
};

export const EditTableForm = ({ setIsEditTableOpen, currentTable }: any) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const currentMenu = useSelector(selectCurrentRestaurantMenu);
  const currency = useSelector(selectCurrentRestaurantCurrency);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
  const [shouldKeepMenuOpen, setShouldKeepMenuOpen] = useState(false);
  const [activeOrderIndex, setActiveOrderIndex] = useState<number | null>(null);
  const [menuFilter, setMenuFilter] = useState('');
  const [ordersToDelete, setOrdersToDelete] = useState<string[] | []>([]);
  const [ordersItems, setOrdersItems] = useState<setOrderType[]>(
    currentTable.orders
  );

  const filteredMenu = currentMenu!.filter(dish =>
    dish.name.toLowerCase().includes(menuFilter.toLocaleLowerCase())
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { restaurantId } = router.query;

    const credentials = {
      tableId: currentTable._id,
      name: (form.elements.namedItem('tableName') as HTMLInputElement).value,
      description: (
        form.elements.namedItem('tableDescription') as HTMLInputElement
      ).value,
      orders: ordersItems,
      icon: 'icon.img',
      ordersToDelete: ordersToDelete,
    };

    const restaurantTableData: editRestaurantTableType = {
      table: credentials,
      restaurantId: restaurantId,
    };

    console.log(restaurantTableData);
    await dispatch(updateRestaurantTable(restaurantTableData));
    setIsEditTableOpen(false);
    form.reset();
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
    fieldName: string
  ) => {
    const { value } = e.target;
    let parsedValue: number | string = value;

    // if (fieldName === 'kcal' || fieldName === 'price') {
    //   parsedValue = parseFloat(value);
    // }

    setOrdersItems((prevMenuItems: any) => {
      const updatedMenuItems = [...prevMenuItems];
      updatedMenuItems[index] = {
        ...updatedMenuItems[index],
        [fieldName]: parsedValue,
      };
      return updatedMenuItems;
    });
  };

  const handleAddNewOrder = () => {
    setOrdersItems((prevMenuItems: any) => [
      ...prevMenuItems,
      {
        name: '',
        dishes: [],
      },
    ]);
  };

  const handleSelectDish = (selectedDish: dishType, orderIndex: number) => {
    console.log('funkcja działa chyba');
    setOrdersItems(prevOrdersItems => {
      const updatedOrdersItems = [...prevOrdersItems];
      updatedOrdersItems[orderIndex] = {
        ...updatedOrdersItems[orderIndex],
        dishes: [...updatedOrdersItems[orderIndex].dishes, selectedDish],
      };
      return updatedOrdersItems;
    });
    setShouldKeepMenuOpen(false);
    setIsOrderMenuOpen(false);
  };

  const handleRemoveOrder = (index: number, orderId: string | undefined) => {
    setOrdersItems((prevMenuItems: any) => {
      const updatedMenuItems = [...prevMenuItems];
      updatedMenuItems.splice(index, 1);

      if (orderId) {
        setOrdersToDelete(prevOrders => [...prevOrders, orderId]);
      }

      return updatedMenuItems;
    });
  };

  const handleremoveDishFromOrder = (dishIndex: number, orderIndex: number) => {
    setOrdersItems((prevMenuItems: setOrderType[]) => {
      const updatedMenuItems = prevMenuItems.map((item, i) => {
        if (i === orderIndex) {
          const updatedDishes = item.dishes.filter(
            (dish, j) => j !== dishIndex
          );
          return { ...item, dishes: updatedDishes };
        }
        return item;
      });
      return updatedMenuItems;
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
    >
      <button
        className={`${styles.button} ${styles.buttonCancel}`}
        onClick={() => setIsEditTableOpen(false)}
      >
        Cancel table modifications
      </button>
      <h2 className={styles.title}>Edit table</h2>

      <div className={styles.formGroup}>
        <label htmlFor="tableName" className={styles.label}>
          Table name
        </label>
        <input
          type="text"
          name="tableName"
          defaultValue={currentTable.name}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tableDescription" className={styles.label}>
          Description
        </label>
        <textarea
          name="tableDescription"
          defaultValue={currentTable.description}
          className={styles.textarea}
          maxLength={200}
        />
      </div>

      {ordersItems!.map((item, index) => (
        <div className={styles.dish} key={index}>
          <div className={styles.formGroup}>
            <label htmlFor={`dishName${index}`} className={styles.label}>
              {index + 1}. Order name
            </label>
            <input
              type="text"
              name={`name${index}`}
              className={styles.input}
              value={item.name}
              onChange={e => handleInputChange(e, index, 'name')}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={`dishName${index}`} className={styles.label}>
              Add dish to order
            </label>
            <input
              onFocus={() => {
                setIsOrderMenuOpen(true);
                setActiveOrderIndex(index);
              }}
              onBlur={() => {
                if (!shouldKeepMenuOpen) {
                  setIsOrderMenuOpen(false);
                }
              }}
              onChange={event => {
                const value = event.target.value;
                setMenuFilter(value);
              }}
              type="text"
              name={`name${index}`}
              className={styles.input}
              placeholder="Search dish name"
            />
            {isOrderMenuOpen && activeOrderIndex === index && (
              <div className={styles.menuBlock}>
                <ul className={styles.menuList}>
                  {filteredMenu?.map(dish => (
                    <li
                      key={`${dish._id}_${nanoid()}`}
                      className={styles.menuItem}
                      onMouseDown={() => handleSelectDish(dish, index)}
                      onClick={() => {
                        console.log('mouse down');
                        setShouldKeepMenuOpen(true);
                      }}
                    >
                      <h2 className={styles.menuItemTitle}>{dish.name}</h2>
                      <p className={styles.menuItemInfo}>kcal: {dish.kcal}</p>
                      <p className={styles.menuItemInfo}>price: {dish.price}</p>
                      <p className={styles.menuItemDescription}>
                        {dish.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {item.dishes.length !== 0 && (
            <div className={styles.pickedDishesBlock}>
              <h2 className={styles.pickedDishesTitle}>Picked dishes</h2>
              <ul className={styles.pickedDishesList}>
                {item.dishes?.map((dish, dishIndex) => (
                  <li key={`${dish._id}_${dishIndex}`}>
                    <div className={styles.dishWrapper}>
                      <p className={styles.pickedDishesName}>
                        - <span style={{ fontWeight: '400' }}>{dish.name}</span>{' '}
                        (kcal: {dish.kcal}, price: {dish.price} {currency})
                      </p>
                      <button
                        className={styles.btnRemoveDish}
                        onClick={() =>
                          handleremoveDishFromOrder(dishIndex, index)
                        }
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            className={`${styles.button} ${styles.buttonCancel}`}
            type="button"
            onClick={() => handleRemoveOrder(index, item._id)}
          >
            Remove Order {`${index + 1}`}
          </button>
        </div>
      ))}

      <button
        className={`${styles.button} ${styles.buttonAddOrder}`}
        type="button"
        onClick={handleAddNewOrder}
      >
        Add New Order
      </button>

      <button type="submit" className={styles.button}>
        Submit changes
      </button>
    </form>
  );
};
