import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { setRestaurantData } from '../redux/restaurants/restaurantsSlice';
import { selectRestaurantsData } from '../redux/restaurants/restaurantsSelectors';
import { selectState } from '../redux/restaurants/restaurantsSelectors';
import { RestaurantBlock } from '../Components/RestaurantBlock/RestaurantBlock';
import css from '../styles/restaurant.module.css';
import { nanoid } from 'nanoid';
import Link from 'next/link';

const Restaurants = ({ restaurantData }: any) => {
  const dispatch: AppDispatch = useDispatch();


  const restaurants = useSelector(selectRestaurantsData);
  // const state = useSelector(selectState);
  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(setRestaurantData(restaurantData));
    }
  }, [dispatch, restaurants.length, restaurantData]);


  return (
    <div className={css.container}>
      <button onClick={() => console.log("")}>STATE</button>
      <p>Restaurants</p>
      <ul className={css.restaurantsList}>
        <li key={nanoid()}>
          <div className={css.newRestaurantBlock}>
            <button className={css.newRestaurantBtn}>Add new restaurant</button>
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
