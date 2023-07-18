import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ComponentType } from 'react';
import Notiflix from 'notiflix';

type ProtectedRouteProps = {
  component: ComponentType;
  redirectTo?: string;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const { isLoggedIn } = useAuth();
  const { isRefreshing } = useAuth();
  //   console.log('islogedin', isLoggedIn);
  //   console.log('is refreshing', isRefreshing);
  const handleOnClickCheckLoged = () => {
    if (!isLoggedIn)
      return Notiflix.Notify.failure(
        'You have to be logged user to get acces for Pokedex'
      );
  };

  handleOnClickCheckLoged();

  const shouldRedirect = isLoggedIn === true && isRefreshing === false;
  return shouldRedirect ? <Component /> : <Navigate to={redirectTo} />;
};
