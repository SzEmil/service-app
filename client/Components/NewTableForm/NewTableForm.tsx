import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import styles from './NewTableForm.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentRestaurantMenu } from '../../redux/restaurants/restaurantsSelectors';
import { dishType } from '../../types/restaurant';
import { orderType } from '../../types/restaurant';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { addRestaurantTable } from '../../redux/restaurants/restaurantsOperations';

type setOrderType = {
  name: string;
  dishes: dishType[] | [];
};

type addRestaurantTable = {
  table: {
    name: string;
    description: string;
    orders: orderType[];
  };
  restaurantId: string | string[] | undefined;
};

export const NewTableForm = ({ setIsNewTableOpen }: any) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const currentMenu = useSelector(selectCurrentRestaurantMenu);

  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
  const [shouldKeepMenuOpen, setShouldKeepMenuOpen] = useState(false);
  const [activeOrderIndex, setActiveOrderIndex] = useState<number | null>(null);

  const [ordersItems, setOrdersItems] = useState<setOrderType[]>([
    {
      name: '',
      dishes: [],
    },
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { restaurantId } = router.query;

    const credentials = {
      name: (form.elements.namedItem('tableName') as HTMLInputElement).value,
      description: (
        form.elements.namedItem('tableDescription') as HTMLInputElement
      ).value,
      orders: ordersItems,
      icon: 'icon.img',
    };

    const restaurantTableData: addRestaurantTable = {
      table: credentials,
      restaurantId: restaurantId,
    };

    console.log(restaurantTableData);
    await dispatch(addRestaurantTable(restaurantTableData));
    setIsNewTableOpen(false);
    setOrdersItems([
      {
        name: '',
        dishes: [],
      },
    ]);
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

    if (fieldName === 'kcal' || fieldName === 'price') {
      parsedValue = parseFloat(value);
    }

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
        description: '',
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

  const handleRemoveOrder = (index: number) => {
    setOrdersItems((prevMenuItems: any) => {
      const updatedMenuItems = [...prevMenuItems];
      updatedMenuItems.splice(index, 1);
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
        onClick={() => setIsNewTableOpen(false)}
      >
        Cancel new table
      </button>
      <h2 className={styles.title}>Add table</h2>

      <div className={styles.formGroup}>
        <label htmlFor="tableName" className={styles.label}>
          Table name
        </label>
        <input type="text" name="tableName" className={styles.input} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tableDescription" className={styles.label}>
          Description
        </label>
        <textarea
          name="tableDescription"
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
              type="text"
              name={`name${index}`}
              className={styles.input}
              placeholder="Search dish name"
            />
            {isOrderMenuOpen && activeOrderIndex === index && (
              <div className={styles.menuBlock}>
                <ul className={styles.menuList}>
                  {currentMenu?.map(dish => (
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
                {item.dishes.map(dish => (
                  <li key={nanoid()}>
                    {' '}
                    <p className={styles.pickedDishesName}>
                      - <span style={{ fontWeight: '400' }}>{dish.name}</span>{' '}
                      (kcal: {dish.kcal}, price: {dish.price})
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            className={`${styles.button} ${styles.buttonCancel}`}
            type="button"
            onClick={() => handleRemoveOrder(index)}
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
        Add new table
      </button>
    </form>
  );
};
