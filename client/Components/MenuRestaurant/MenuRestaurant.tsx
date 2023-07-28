import React from 'react';
import { dishType } from '../../types/restaurant';
import css from './MenuRestaurant.module.css';
import { FilterMenu } from '../FilterMenu/FilterMenu';
import { useSelector } from 'react-redux';
import { selectFilterInput } from '../../redux/filter/filterSelectors';
import { MenuForm } from '../MenuForm/MenuForm';
import { useState } from 'react';

type menuProps = {
  menu: dishType[] | [] | null | undefined;
};

export const MenuRestaurant = ({ menu }: menuProps) => {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

  const filteredInput = useSelector(selectFilterInput);
  const filteredMenu = menu!.filter(dish =>
    dish.name.toLowerCase().includes(filteredInput.toLocaleLowerCase())
  );
  return (
    <div>
      <div className={css.menuSearchForm}>
        <div className={css.menuBox}>
          <button
            onClick={() => setIsEditMenuOpen(true)}
            className={css.button}
          >
            Edit menu
          </button>
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
      {isEditMenuOpen && (
        <div className={css.editMenuFormBackdrop}>
          <div className={css.editMenuFormWrapper}>
            <MenuForm setIsEditMenuOpen={setIsEditMenuOpen} />
          </div>
        </div>
      )}

    </div>
  );
};
