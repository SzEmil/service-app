import React from 'react';
import { useSelector } from 'react-redux';
import { selectRestaurantOverview } from '../../redux/restaurants/restaurantsSelectors';
import { overviewType } from '../../redux/restaurants/restaurantsSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import css from './Overview.module.css';
import { selectRestaurantOverviewLoading } from '../../redux/restaurants/restaurantsSelectors';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import { selectCurrentRestaurantCurrency } from '../../redux/restaurants/restaurantsSelectors';

export const Overview = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const overview = useSelector(selectRestaurantOverview);
  const isLoading = useSelector(selectRestaurantOverviewLoading);
  const currency = useSelector(selectCurrentRestaurantCurrency);
  function getRandomRGBA() {
    const randomColor = () => Math.floor(Math.random() * 256);
    const red = randomColor();
    const green = randomColor();
    const blue = randomColor();
    const alpha = Math.random();

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
  const top10DishesSold = overview.topDishes.slice(0, 10);
  const valueArray = overview.topDishes.map(dish => dish.sold);
  const totalDishesSold = valueArray.reduce(
    (prevVal, currentVal) => (currentVal += prevVal),
    0
  );
  const data = {
    labels: overview.topDishes.map(
      (dish, index) => `${index + 1}. ${dish.name}`
    ),
    datasets: [
      {
        label: '# Dish sold',
        data: top10DishesSold.map(dish => dish.sold),
        backgroundColor: top10DishesSold.map(dish => getRandomRGBA()),
        borderColor: top10DishesSold.map(dish => 'rgba(0,0,0, 0.1)'),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'black',
        },
      },
    },
  };

  return (
    <>
      <div
        className={`${css.loadingPage} ${isLoading ? css.loadingActive : null}`}
      >
        <LoadingPage />
      </div>
      <div className={css.overviewWrapper}>
        <div className={css.overviewDetailsWrapper}>
          <div className={css.overviewDetailsBox}>
            <p>Total orders served: {overview.totalOrders}</p>
          </div>
          <div className={css.overviewDetailsBox}>
            <p>Total dishes sold: {totalDishesSold}</p>
          </div>
          <div className={css.overviewDetailsBox}>
            <p>
              Total cash earned: {overview.cashEarned.toFixed(2)}
              {currency}
            </p>
          </div>
        </div>
        <div className={css.topDishesWrapper}>
          <div className={css.bestSellingDishes}>
            <h2 className={css.bestSellingDishesTitle}>Best-selling dishes</h2>
            <ul className={css.bestSellingDishesList}>
              {top10DishesSold.map((dish, index) => (
                <li key={dish._id}>
                  {index + 1}. {dish.name} sold: {dish.sold}
                </li>
              ))}
            </ul>
          </div>
          <div className={css.doghnutWrapper}>
            <Doughnut
              data={data}
              redraw={true}
              options={options}
              width={'100%'}
            />
          </div>
        </div>
      </div>
    </>
  );
};
