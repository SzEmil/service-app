import '../styles/globals.css';
import type { AppProps } from 'next/app';
import UserData from './user-data';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserData userData={[]} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
