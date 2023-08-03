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
import { selectAuthUserIsLoading } from '../../redux/user/userSelectors';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import { refreshUser } from '../../redux/user/userOperations';
import { selectIsServerConnected } from '../../redux/user/userSelectors';
import { serverConnected } from '../../redux/user/userSlice';
type LayoutProps = {
  children: ReactNode;
};

export const SharedLayout: React.FC<LayoutProps> = ({ children }) => {
  const isServerConnected = useSelector(selectIsServerConnected);

  useEffect(() => {
    if (!isServerConnected) {
      const eventSource = new EventSource('http://localhost:3001/api/stream');
      eventSource.onopen = () => {
        dispatch(serverConnected());
      };

      eventSource.onerror = () => {
        console.error('SSE connection error');
      };

      if (isServerConnected) eventSource.close();
      return () => {
        eventSource.close();
      };
    }
  }, []);

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUserData);
  const isLoading = useSelector(selectAuthUserIsLoading);
  const router = useRouter();
  const { isLoggedIn, isRefreshing } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    } else {
      dispatch(getInvitationsData);
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [refreshUser]);
  return (
    <>
      {isServerConnected ? (
        <>
          {isRefreshing ? (
            <div
              className={`${css.loadingPage} ${
                isRefreshing ? css.loadingActive : null
              }`}
            >
              <LoadingPage />
            </div>
          ) : (
            <div className={css.container}>
              <Header user={user} />

              <main className={css.main}>{children}</main>
              <div className={css.cookieBox}>
                <CookieBaner />
              </div>

              <div
                className={`${css.loadingPage} ${
                  isLoading ? css.loadingActive : null
                }`}
              >
                <LoadingPage />
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className={`${css.loadingPage} ${
            !isServerConnected ? css.loadingActive : null
          }`}
        >
          <LoadingPage />
        </div>
      )}
    </>
  );
};
