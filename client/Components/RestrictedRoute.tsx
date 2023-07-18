import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ComponentType } from 'react';

type RestrictedRouteProps = {
  component: ComponentType;
  redirectTo?: string;
};

export const RestrictedRoute = ({
  component: Component,
  redirectTo = '/',
}: RestrictedRouteProps) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};
