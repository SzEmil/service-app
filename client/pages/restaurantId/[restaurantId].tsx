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
import { setCurrentRestaurantColabolators } from '../../redux/restaurants/restaurantsSlice';
import { userType } from '../../types/user';
import { imageSrc } from '../../Components/Header/Header';
import Image from 'next/image';
import { removeRestaurant } from '../../redux/restaurants/restaurantsOperations';
import { LoadingPage } from '../../Components/LoadingPage/LoadingPage';
import { getRestaurantOverview } from '../../redux/restaurants/restaurantsOperations';
import { Overview } from '../../Components/Overview/Overview';

type leaveRestaurantData = {
  restaurantId: string | string[] | undefined;
};
const RestaurantPage = ({ restaurant, restaurantData }: any) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    setIsPageLoading(false);
  }, [restaurantData, restaurant]);

  const [isTablesOpen, setIsTablesOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  const [restaurantMenuOpen, setRestaurantMenuOpen] = useState(false);
  const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectAuthUser);
  const currentRestaurant = useSelector(selectCurrentRestaurant);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menuWrapper = document.getElementById('restaurantOptionsWrapper');
      const menuBtn = document.getElementById('menuBtn');

      if (
        menuWrapper &&
        !menuBtn?.contains(target) &&
        !menuWrapper.contains(target)
      ) {
        setRestaurantMenuOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    dispatch(setCurrentRestaurant(restaurant));
    dispatch(setCurrentRestaurantColabolators(restaurantData.colabolators));
  }, [dispatch, restaurant, restaurantData.colabolators]);

  const handleOpenTables = () => {
    setIsTablesOpen(true);
    setIsMenuOpen(false);
    setIsOverviewOpen(false)
  };

  const handleOpenMenu = () => {
    setIsTablesOpen(false);
    setIsMenuOpen(true);
    setIsOverviewOpen(false)
  };

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
  const handleMakeImageURL = (userAvatarURL: String | undefined) => {
    return `${imageSrc}/${userAvatarURL}`;
  };

  const handleOnClickRemoveRestaurant = async () => {
    const { restaurantId } = router.query;
    await dispatch(removeRestaurant(restaurantId));
    router.push('/restaurants');
  };

  const handleOnClickOpenOverviewWindow = async () => {
    setIsTablesOpen(false);
    setIsMenuOpen(false);
    const { restaurantId } = router.query;
    await dispatch(getRestaurantOverview(restaurantId));
    setIsOverviewOpen(true);
  };

  return (
    <>
      <div>
        <div
          className={`${css.loadingPage} ${
            isPageLoading ? css.loadingActive : null
          }`}
        >
          <LoadingPage />
        </div>
        {restaurant && (
          <div className={css.restaurant}>
            <div className={css.restaurantNameWrapper}>
              <button
                id="menuBtn"
                onClick={() => {
                  setRestaurantMenuOpen(prevVal => !prevVal);
                }}
                className={`${css.restaurantName} ${
                  restaurantMenuOpen && css.activeLink
                }`}
              >
                {restaurant.name}
              </button>

              <ul className={css.colabolatorsList}>
                <li key={user.user.id} className={css.colabolatorsItem}>
                  <Image
                    src={handleMakeImageURL(restaurantData.owner.avatarURL)}
                    alt="user pic"
                    width={40}
                    height={40}
                    className={css.colabolatorImage}
                  />
                  <div className={css.userNameBox}>
                    <p className={css.colaboratorUsername}>
                      {restaurantData.owner.username}
                    </p>
                  </div>
                </li>
                {restaurantData.colabolators.map((colabolator: userType) => (
                  <li className={css.colabolatorsItem} key={colabolator._id}>
                    <Image
                      src={handleMakeImageURL(colabolator.avatarURL)}
                      alt="user pic"
                      width={40}
                      height={40}
                      className={css.colabolatorImage}
                    />
                    <div className={css.userNameBox}>
                      <p className={css.colaboratorUsername}>
                        {colabolator.username}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {restaurantMenuOpen && (
              <div
                id="restaurantOptionsWrapper"
                className={css.restaurantOptionsWrapper}
              >
                <div className={css.restaurantBtnOptions}>
                  <div>
                    <button
                      className={`${css.button} ${css.btnMenuRestaurant}`}
                      onClick={() => setIsInviteFormOpen(true)}
                    >
                      Invite friend
                    </button>
                  </div>
                  {restaurant.colabolators &&
                    restaurant.colabolators.includes(user.user.id) && (
                      <div>
                        <button
                          className={`${css.button} ${css.btnMenuRestaurant}`}
                          onClick={() => handleOnClickLeaveRestaurant()}
                        >
                          Leave restaurant
                        </button>
                      </div>
                    )}
                  {restaurant.owner === user.user.id && (
                    <div>
                      <button
                        onClick={() => handleOnClickRemoveRestaurant()}
                        className={`${css.button} ${css.btnMenuRestaurant}`}
                      >
                        Remove restaurant
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <ul className={css.navBtn}>
              <li>
                <button
                  className={`${css.button} ${css.buttonMarginLeft} ${
                    !isTablesOpen && !isMenuOpen && isOverviewOpen
                      ? css.btnActive
                      : null
                  }`}
                  onClick={() => handleOnClickOpenOverviewWindow()}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenTables()}
                  className={`${css.button} ${css.buttonMarginLeft} ${
                    isTablesOpen && !isMenuOpen && !isOverviewOpen
                      ? css.btnActive
                      : null
                  }`}
                >
                  Tables
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenMenu()}
                  className={`${css.button} ${css.buttonMarginLeft} ${
                    !isTablesOpen && isMenuOpen && !isOverviewOpen
                      ? css.btnActive
                      : null
                  }`}
                >
                  Menu
                </button>
              </li>
            </ul>
            {currentRestaurant !== null ? (
              <div>
                {isMenuOpen && !isTablesOpen && !isOverviewOpen && (
                  <div>
                    <MenuRestaurant menu={currentRestaurant!.menu} />
                  </div>
                )}

                {isTablesOpen && !isMenuOpen && !isOverviewOpen && (
                  <div>
                    <TablesRestaurant tables={currentRestaurant.tables} />
                  </div>
                )}
                {!isTablesOpen && !isMenuOpen && isOverviewOpen && <Overview />}
              </div>
            ) : (
              <LoadingPage />
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
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const token = context.req.headers.cookie?.replace('token=', '');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const { restaurantId } = context.params;

    const responseRestaurant = await axios.get(`/restaurants/${restaurantId}`);
    const data = responseRestaurant.data;
    const restaurant = data.ResponseBody.restaurant;

    const responseColabolators = await axios.get(
      `/restaurants/${restaurantId}/colabolators`
    );
    const restaurantData: userType[] =
      responseColabolators.data.ResponseBody.restaurantData;
    return {
      props: {
        restaurant,
        restaurantData,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        restaurant: {},
        restaurantData: {
          colabolators: [],
          owner: null,
        },
      },
    };
  }
}

export default RestaurantPage;
