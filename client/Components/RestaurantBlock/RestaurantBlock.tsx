import React from 'react';
import { restaurantType } from '../../types/restaurant';
import css from './RestaurantBlock.module.css';
import { MdTableRestaurant } from 'react-icons/md';
import { FaBowlFood } from 'react-icons/fa6';
type restaurantPropType = {
  restaurant: restaurantType;
};

const cutDate = (date: string | null | undefined) => {
  const year = date!.slice(0, 10);
  const time = date!.slice(11, 16);

  return `${year}  ${time}`;
};
export const RestaurantBlock = ({ restaurant }: restaurantPropType) => {
  return (
    <div className={css.container}>
      <div className={css.descriptionBlock}>
        <p className={css.descriptionDate}>{cutDate(restaurant.createdAt)}</p>
        <h2 className={css.descriptionTitle}>"{restaurant.name}"</h2>
        <div className={css.infoBox}>
          <div className={css.infoItem}>
            <p className={css.infoLabel}>Active tables</p>
            <div className={css.counter}>
              <MdTableRestaurant size={'20px'} />
              <p className={css.numberOf}>{restaurant.tables?.length}</p>
            </div>
          </div>
          <div className={css.infoItem}>
            <p className={css.infoLabel}>Menu</p>
            <div className={css.counter}>
              <FaBowlFood size={'18px'} />
              <p className={css.numberOf}>{restaurant.menu?.length}</p>
            </div>
          </div>
        </div>
        <p className={css.details}>Click for details</p>
      </div>
    </div>
  );
};
