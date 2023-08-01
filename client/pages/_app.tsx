import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from '../Components/SharedLayout/SharedLayout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {!isHomePage && (
            <SharedLayout>
              <Component {...pageProps} />
            </SharedLayout>
          )}
          {isHomePage && <Component {...pageProps} />}
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
