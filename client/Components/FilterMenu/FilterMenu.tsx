import css from './FilterMenu.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { ChangeEvent } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { selectFilterInput } from '../../redux/filter/filterSelectors';
import { setFilterData } from '../../redux/filter/filterSlice';
export const FilterMenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const filterInput = useSelector(selectFilterInput);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;
    dispatch(setFilterData(inputVal));
  };
  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Dish name"
        name="dish"
        value={filterInput}
        onChange={handleOnChange}
      />
    </div>
  );
};
