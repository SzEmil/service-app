import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import styles from './NewRestaurantForm.module.css';
import { FormEvent } from 'react';
import { addRestaurant } from '../../redux/restaurants/restaurantsOperations';
export const NewRestaurantForm = ({ setIsNewRestaurantFormVisible }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const [menuItems, setMenuItems] = useState([
    {
      name: '',
      description: '',
      kcal: 0,
      price: 0,
    },
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const credentials = {
      name: (form.elements.namedItem('restaurantName') as HTMLInputElement)
        .value,
      menu: menuItems,
      icon: 'icon.img',
      currency: (
        form.elements.namedItem('restaurantCurrency') as HTMLSelectElement
      ).value,
    };
    console.log(credentials);
    setMenuItems([
      {
        name: '',
        description: '',
        kcal: 0,
        price: 0,
      },
    ]);
    dispatch(addRestaurant(credentials));
    form.reset();
    setIsNewRestaurantFormVisible(false);
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

    setMenuItems(prevMenuItems => {
      const updatedMenuItems = [...prevMenuItems];
      updatedMenuItems[index] = {
        ...updatedMenuItems[index],
        [fieldName]: parsedValue,
      };
      return updatedMenuItems;
    });
  };

  const handleAddNewDish = () => {
    setMenuItems(prevMenuItems => [
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
    setMenuItems(prevMenuItems => {
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
        onClick={() => setIsNewRestaurantFormVisible(false)}
      >
        Cancel restaurant
      </button>
      <h2 className={styles.title}>Add new Restaurant</h2>
      <div className={styles.formGroup}>
        <label htmlFor="restaurantName" className={styles.label}>
          Restaurant name
        </label>
        <input
          type="text"
          id="restaurantName"
          name="restaurantName"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="restaurantCurrency" className={styles.label}>
          Currency
        </label>
        <select
          id="restaurantCurrency"
          name="restaurantCurrency"
          className={styles.input}
          required
          placeholder="Pick Currency"
        >
          <option value="$">USD - United States Dollar</option>
          <option value="€">EUR - Euro</option>
          <option value="zł">PLN - Polish Złoty</option>
          <option value="¥">JPY - Japanese Yen</option>
          <option value="£">GBP - British Pound Sterling</option>
          <option value="$">AUD - Australian Dollar</option>
          <option value="$">CAD - Canadian Dollar</option>
          <option value="Fr">CHF - Swiss Franc</option>
          <option value="¥">CNY - Chinese Yuan</option>
          <option value="SEK">kr - Swedish Krona</option>
          <option value="NZD">$ - New Zealand Dollar</option>
        </select>
      </div>

      {menuItems.map((item, index) => (
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
              step={0.01}
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
        Create restaurant
      </button>
    </form>
  );
};
