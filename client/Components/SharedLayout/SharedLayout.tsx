import React, { ReactNode } from 'react';
import css from './SharedLayout.module.css';
import { useSelector } from 'react-redux';
import { selectAuthUserData } from '../../redux/user/userSelectors';
import { Header } from '../Header/Header';
import { CookieBaner } from '../CookieBaner/CookieBaner';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { getInvitationsData } from '../../redux/user/userOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

type LayoutProps = {
  children: ReactNode;
};

export const SharedLayout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUserData);

  const router = useRouter();
  const { isLoggedIn, isRefreshing } = useAuth();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push('/');
  //   }
  //   dispatch(getInvitationsData)
  // }, [isLoggedIn, router]);

  return (
    <div className={css.container}>
      <Header user={user} />

      <main className={css.main}>{children}</main>
      <div className={css.cookieBox}>
        <CookieBaner />
      </div>
    </div>
  );
};
