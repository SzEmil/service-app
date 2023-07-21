import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { setRestaurantData } from '../../redux/restaurants/restaurantsSlice';
import css from '../styles/restaurant.module.css';
import { nanoid } from 'nanoid';


const RestaurantPage = ({ restaurant }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }


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
