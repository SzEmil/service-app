import React from 'react';
import { dishType } from '../../types/restaurant';
import css from './MenuRestaurant.module.css';
import { FilterMenu } from '../FilterMenu/FilterMenu';
import { useSelector } from 'react-redux';
import { selectFilterInput } from '../../redux/filter/filterSelectors';
import { MenuForm } from '../MenuForm/MenuForm';
import { useState } from 'react';
import { selectCurrentRestaurantCurrency } from '../../redux/restaurants/restaurantsSelectors';
import { MdEdit } from 'react-icons/md';

type menuProps = {
  menu: dishType[] | [] | null | undefined;
};

export const MenuRestaurant = ({ menu }: menuProps) => {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

  const currency = useSelector(selectCurrentRestaurantCurrency);
  const filteredInput = useSelector(selectFilterInput);
  const filteredMenu = menu!.filter(dish =>
    dish.name.toLowerCase().includes(filteredInput.toLocaleLowerCase())
  );
  return (
    <div className={css.menuContainer}>
      <div className={css.menuSearchForm}>
        <div className={css.menuBox}>
          <button
            onClick={() => setIsEditMenuOpen(true)}
            className={css.button}
          >
            <div className={css.btnText}>
              {' '}
              <span>Edit menu</span> <MdEdit size={24} />
            </div>
            <div className={css.btnIcon}>
              <MdEdit size={24} />
            </div>
          </button>
          <FilterMenu />
        </div>
      </div>
      <ul className={css.list}>
        {filteredMenu.map(dish => (
          <li className={css.item} key={dish._id}>
            <div className={css.dishInfo}>
              <h2 className={css.dishName}>{dish.name}</h2>
              <p className={css.dishDescription}>{dish.description}</p>
            </div>
            <div className={css.dishDetails}>
              <p className={css.dishPrice}>
                {dish.price} {currency}
              </p>
              <p className={css.dishKcal}>{dish.kcal} kcal</p>
            </div>
          </li>
        ))}
      </ul>
      {isEditMenuOpen && (
        <div className={css.menuFormBackdrop}>
          <div className={css.menuFormWrapper}>
            <MenuForm setIsEditMenuOpen={setIsEditMenuOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
