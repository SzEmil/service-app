import { useSelector } from 'react-redux';
import { selectAuthUserIsLoggedIn } from '../redux/user/userSelectors';
import { selectAuthUserIsRefreshing } from '../redux/user/userSelectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  const isRefreshing = useSelector(selectAuthUserIsRefreshing);

  return {
    isLoggedIn,
    isRefreshing,
  };
};
