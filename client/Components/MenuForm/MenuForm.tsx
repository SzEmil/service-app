import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import styles from './MenuForm.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentRestaurantMenu } from '../../redux/restaurants/restaurantsSelectors';

export const MenuForm = ({ setIsEditMenuOpen }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const currentMenu = useSelector(selectCurrentRestaurantMenu);

  const [menuItems, setMenuItems] = useState(currentMenu);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const credentials = {
      menu: menuItems,
      icon: 'icon.img',
    };
    console.log(credentials);
    //   setMenuItems([
    //     {
    //       name: '',
    //       description: '',
    //       kcal: 0,
    //       price: 0,
    //     },
    //   ]);
    //   dispatch(addRestaurant(credentials));
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

    setMenuItems((prevMenuItems: any) => {
      const updatedMenuItems = [...prevMenuItems];
      updatedMenuItems[index] = {
        ...updatedMenuItems[index],
        [fieldName]: parsedValue,
      };
      return updatedMenuItems;
    });
  };

  const handleAddNewDish = () => {
    setMenuItems((prevMenuItems: any) => [
      ...prevMenuItems,
      {
        name: '',
        description: '',
        kcal: 0,
        price: 0,
      },
    ]);
  };

  const handleRemoveDish = (index: number) => {
    setMenuItems((prevMenuItems: any) => {
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
        onClick={() => setIsEditMenuOpen(false)}
      >
        Cancel menu modifications
      </button>
      <h2 className={styles.title}>Edit menu</h2>

      {menuItems!.map((item, index) => (
        <div className={styles.dish} key={index}>
          <div className={styles.formGroup}>
            <label htmlFor={`dishName${index}`} className={styles.label}>
              {index + 1}. Dish Name
            </label>
            <input
              type="text"
              id={`dishName${index}`}
              name={`name${index}`}
              className={styles.input}
              value={item.name}
              onChange={e => handleInputChange(e, index, 'name')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor={`description${index}`} className={styles.label}>
              Description (max. 200 symbols)
            </label>
            <textarea
              id={`description${index}`}
              name={`description${index}`}
              className={styles.textarea}
              value={item.description}
              maxLength={200}
              onChange={e => handleInputChange(e, index, 'description')}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor={`kcal${index}`} className={styles.label}>
              Kcal
            </label>
            <input
              type="number"
              id={`kcal${index}`}
              name={`kcal${index}`}
              className={styles.input}
              value={item.kcal}
              min={0}
              onChange={e => handleInputChange(e, index, 'kcal')}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor={`price${index}`} className={styles.label}>
              Price
            </label>
            <input
              type="number"
              id={`price${index}`}
              name={`price${index}`}
              className={styles.input}
              value={item.price}
              min={0}
              onChange={e => handleInputChange(e, index, 'price')}
              required
            />
          </div>
          <button
            className={`${styles.button} ${styles.buttonCancel}`}
            type="button"
            onClick={() => handleRemoveDish(index)}
          >
            Remove Dish {`${index + 1}`}
          </button>
        </div>
      ))}

      <button
        className={`${styles.button} ${styles.buttonAddDish}`}
        type="button"
        onClick={handleAddNewDish}
      >
        Add New Dish
      </button>

      <button type="submit" className={styles.button}>
        Save changes
      </button>
    </form>
  );
};
