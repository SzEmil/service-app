import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import css from '../../styles/restaurantId.module.css';
import { selectCurrentRestaurant } from '../../redux/restaurants/restaurantsSelectors';
import { setCurrentRestaurant } from '../../redux/restaurants/restaurantsSlice';
import { MenuRestaurant } from '../../Components/MenuRestaurant/MenuRestaurant';
import { TablesRestaurant } from '../../Components/TablesRestaurant/TablesRestaurant';
import { InviteForm } from '../../Components/InviteForm/InviteForm';
import { removeRestaurantColabolator } from '../../redux/restaurants/restaurantsOperations';
import { selectAuthUser } from '../../redux/user/userSelectors';

type leaveRestaurantData = {
  restaurantId: string | string[] | undefined;
};
const RestaurantPage = ({ restaurant }: any) => {
  const [isTablesOpen, setIsTablesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);

  const handleOpenTables = () => {
    setIsTablesOpen(true);
    setIsMenuOpen(false);
  };

  const handleOpenMenu = () => {
    setIsTablesOpen(false);
    setIsMenuOpen(true);
  };

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectAuthUser);
  const currentRestaurant = useSelector(selectCurrentRestaurant);

  useEffect(() => {
    dispatch(setCurrentRestaurant(restaurant));
  }, [dispatch]);

  const handleOnClickLeaveRestaurant = () => {
    const { restaurantId } = router.query;

    const leaveRestaurantData: leaveRestaurantData = {
      restaurantId: restaurantId,
    };

    dispatch(removeRestaurantColabolator(leaveRestaurantData));
    router.push('/restaurants');
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {restaurant && (
        <div>
          <h1 className={css.restaurantName}>{restaurant.name}</h1>
          <div className={css.restaurantBtnOptions}>
            <button
              className={css.button}
              onClick={() => setIsInviteFormOpen(true)}
            >
              Invite friend
            </button>
            {restaurant.colabolators && (
              <div>
                {restaurant.colabolators.includes(user.user.id) && (
                  <button
                    className={`${css.button} ${css.buttonMarginLeft}`}
                    onClick={() => handleOnClickLeaveRestaurant()}
                  >
                    Leave restaurant
                  </button>
                )}
              </div>
            )}
          </div>

          <ul className={css.navBtn}>
            <li>
              <button onClick={() => handleOpenTables()} className={css.button}>
                Tables
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOpenMenu()}
                className={`${css.button} ${css.buttonMarginLeft}`}
              >
                Menu
              </button>
            </li>
          </ul>
          {currentRestaurant !== null ? (
            <div>
              {isMenuOpen && isTablesOpen === false && (
                <div>
                  <MenuRestaurant menu={currentRestaurant!.menu} />
                </div>
              )}

              {isTablesOpen && isMenuOpen === false && (
                <div>
                  <TablesRestaurant tables={currentRestaurant.tables} />
                </div>
              )}
            </div>
          ) : (
            <p>Loading data...</p>
          )}
          {isInviteFormOpen && (
            <div className={css.inviteFormBackdrop}>
              <div className={css.inviteFormWrapper}>
                <InviteForm setIsInviteFormOpen={setIsInviteFormOpen} />
              </div>
            </div>
          )}
        </div>
      )}
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
