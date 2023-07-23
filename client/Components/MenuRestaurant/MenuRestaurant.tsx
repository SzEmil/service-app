import React from 'react';
import { dishType } from '../../types/restaurant';
import css from './MenuRestaurant.module.css';
import { FilterMenu } from '../FilterMenu/FilterMenu';
import { useSelector } from 'react-redux';
import { selectFilterInput } from '../../redux/filter/filterSelectors';
import { MenuForm } from '../MenuForm/MenuForm';

type menuProps = {
  menu: dishType[] | [] | null | undefined;
};

export const MenuRestaurant = ({ menu }: menuProps) => {
  const filteredInput = useSelector(selectFilterInput);
  const filteredMenu = menu!.filter(dish =>
    dish.name.toLowerCase().includes(filteredInput.toLocaleLowerCase())
  );
  return (
    <div>
      <div className={css.menuSearchForm}>
        <div className={css.menuBox}>
          <h2 className={css.menuTitle}>Menu</h2>
          <button className={css.button}>Edit menu</button>
        </div>
        <FilterMenu />
      </div>
      <ul className={css.list}>
        {filteredMenu!.map(dish => (
          <li className={css.item} key={dish._id}>
            <div>
              <h2 className={css.dishName}>{dish.name}</h2>
              <div className={css.dishParameters}>
                <p className={css.dishParametersVal}>
                  <span className={css.dishParametersText}>Price:</span>{' '}
                  {dish.price}
                </p>
                <p className={css.dishParametersVal}>
                  <span className={css.dishParametersText}>kcal:</span>{' '}
                  {dish.kcal}
                </p>
              </div>
            </div>
            <p className={css.dishDescription}>{dish.description}</p>
          </li>
        ))}
      </ul>
      <MenuForm />
    </div>
  );
};
