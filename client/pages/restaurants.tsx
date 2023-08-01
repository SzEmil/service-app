import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { setRestaurantData } from '../redux/restaurants/restaurantsSlice';
import { selectRestaurantsData } from '../redux/restaurants/restaurantsSelectors';
import { RestaurantBlock } from '../Components/RestaurantBlock/RestaurantBlock';
import css from '../styles/restaurant.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Link from 'next/link';
import { NewRestaurantForm } from '../Components/NewRestaurantForm/NewRestaurantForm';
import { FiRefreshCcw } from 'react-icons/fi';
import { refreshRestaurantsData } from '../redux/restaurants/restaurantsOperations';

const Restaurants = ({ restaurantData }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [isNewRestaurantFormVisible, setIsNewRestaurantFormVisible] =
    useState(false);

  const restaurants = useSelector(selectRestaurantsData);

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(setRestaurantData(restaurantData));
    }
  }, [dispatch, restaurants.length, restaurantData]);

  const handleOnClickRefreshRestaurants = () => {
    dispatch(refreshRestaurantsData());
  };
  return (
    <div className={css.container}>
      <button
        className={css.btnRefresh}
        onClick={() => handleOnClickRefreshRestaurants()}
      >
        Refresh data <FiRefreshCcw size={'24px'} />
      </button>
      
      <ul className={css.restaurantsList}>
        <li key={nanoid()}>
          <div className={css.newRestaurantBlock}>
            <button
              onClick={() => setIsNewRestaurantFormVisible(true)}
              className={css.newRestaurantBtn}
            >
              Add new restaurant
            </button>
          </div>
        </li>

        {restaurants.length !== 0 &&
          restaurants.map(restaurant => (
            <li key={restaurant._id}>
              <Link href={`/restaurantId/${restaurant._id}`}>
                <RestaurantBlock restaurant={restaurant} />
              </Link>
            </li>
          ))}
      </ul>
      {isNewRestaurantFormVisible && (
        <div className={css.newRestaurantFormWrapper}>
          <div className={css.newFormBlock}>
            <NewRestaurantForm
              setIsNewRestaurantFormVisible={setIsNewRestaurantFormVisible}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ req }: any) {
  try {
    console.log('cookie', req.headers.cookie);
    const token = req.headers.cookie?.replace('token=', '');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    const response = await axios.get('http://localhost:3001/api/restaurants');
    const data = response.data;
    const restaurantData = data.ResponseBody.restaurants;

    return {
      props: {
        restaurantData,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        restaurantData: [],
      },
    };
  }
}

export default Restaurants;
