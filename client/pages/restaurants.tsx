import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { logOut } from '../redux/auth/authOperations';
import { selectAuthUser } from '../redux/auth/authSelectors';
import { setRestaurantData } from '../redux/restaurants/restaurantsSlice';
import { selectRestaurantsData } from '../redux/restaurants/restaurantsSelectors';
import { selectState } from '../redux/restaurants/restaurantsSelectors';
import { RestaurantBlock } from '../Components/RestaurantBlock/RestaurantBlock';

const Restaurants = ({ restaurantData }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, isRefreshing } = useAuth();

  const restaurants = useSelector(selectRestaurantsData);

  const state = useSelector(selectState);
  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(setRestaurantData(restaurantData));
    }
  }, [dispatch, restaurants.length, restaurantData]);

  const handleOnClickLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);
  return (
    <div>
      <button onClick={() => console.log(state)}>STATE</button>
      <button onClick={handleOnClickLogOut}>LogOut</button>
      <p>RESTAURACJE TAKIE FAJNE HOHOOHOHO</p>
      <ul>
        {restaurants.length !== 0 &&
          restaurants.map(restaurant => (
            <li key={restaurant._id}>
              <RestaurantBlock restaurant={restaurant} />
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
    const headers = {
      Authorization: `Bearer ${token}`,
    };
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
