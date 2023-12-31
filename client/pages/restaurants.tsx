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
import { LoadingPage } from '../Components/LoadingPage/LoadingPage';
import { pageLoaded } from '../redux/user/userSlice';
import { logOut } from '../redux/user/userOperations';
import { useRouter } from 'next/router';

const Restaurants = ({ restaurantData, validToken }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!validToken) {
      dispatch(logOut());
      router.push('/');
    }
  }, [restaurantData, validToken]);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isNewRestaurantFormVisible, setIsNewRestaurantFormVisible] =
    useState(false);
  const restaurants = useSelector(selectRestaurantsData);

  useEffect(() => {
    setIsPageLoading(false);
    dispatch(pageLoaded());
  }, [restaurantData]);

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(setRestaurantData(restaurantData));
    }
  }, [dispatch, restaurants.length, restaurantData]);

  const handleOnClickRefreshRestaurants = () => {
    dispatch(refreshRestaurantsData());
  };
  return (
    <div>
      <div
        className={`${css.loadingPage} ${
          isPageLoading ? css.loadingActive : null
        }`}
      >
        <LoadingPage />
      </div>

      <div className={css.container}>
        <div
          className={css.btnRefreshWrapper}
          onClick={() => handleOnClickRefreshRestaurants()}
        >
          <p className={css.btnRefreshText}>Refresh data</p>
          <div className={css.btnRefresh}>
            <FiRefreshCcw size={'24px'} />
          </div>
        </div>

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
    </div>
  );
};

export async function getServerSideProps({ req }: any) {
  try {
    console.log('cookie', req.headers.cookie);
    const token = req.headers.cookie?.replace('token=', '');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = await axios.get(`/restaurants`);
    const data = response.data;
    const restaurantData = data.ResponseBody.restaurants;
    const validToken = true;
    return {
      props: {
        restaurantData,
        validToken,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        restaurantData: [],
        validToken: false,
      },
    };
  }
}

export default Restaurants;
