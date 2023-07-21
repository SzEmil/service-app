import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/authSelectors';
import { setRestaurantData } from '../../redux/restaurants/restaurantsSlice';
import { selectRestaurantsData } from '../../redux/restaurants/restaurantsSelectors';
import { selectState } from '../../redux/restaurants/restaurantsSelectors';
import css from '../styles/restaurant.module.css';
import { nanoid } from 'nanoid';
import { Header } from '../../Components/Header/Header';

const RestaurantPage = ({ restaurant }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { isLoggedIn, isRefreshing } = useAuth();

  const user = useSelector(selectAuthUser);
  const state = useSelector(selectState);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push('/');
  //   }
  // }, [isLoggedIn, router]);
  return (
    <>
      <h1>{restaurant.name}</h1>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {

    const token = context.req.headers.cookie?.replace('token=', '');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const { restaurantId } = context.params;

    const response = await axios.get(
      `http://localhost:3001/api/restaurants/${restaurantId}`
    );
    const data = response.data;
    const restaurant = data.ResponseBody.restaurant;

    return {
      props: {
        restaurant,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        restaurant: {},
      },
    };
  }
}

export default RestaurantPage;
