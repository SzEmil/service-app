import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import RegisterForm from '../Components/Register/RegisterForm';
import { useState } from 'react';
import LoginForm from '../Components/LoginForm/LoginForm';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

import { NewRestaurantForm } from '../Components/NewRestaurantForm/NewRestaurantForm';

const Home: NextPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState('register');
  const { isLoggedIn, isRefreshing } = useAuth();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/restaurants');
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Service</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.descriptionBox}>
          {/* <h1 className={styles.title}>Service</h1>
          <p className={styles.motto}>Manage your own service now!</p> */}
          <img
            className={styles.titleImg}
            src={'./logo-low.png'}
            alt="logo pic"
          />
          <p className={styles.question}>What is Service?</p>
          <p className={styles.about}>
            Effortlessly manage orders, split bills, and provide exceptional
            service with our intuitive restaurant management app. Create your
            own restaurant, add tables, and easily track orders within each
            table. Say goodbye to confusion and enjoy the smoothest dining
            experience for both staff and customers. Join us today and
            revolutionize your restaurant operations!
          </p>
        </div>
        <div className={styles.formBox}>
          {form === 'register' && (
            <>
              <RegisterForm />
              <p className={styles.formText}>
                Already have an account?{' '}
                <button
                  className={styles.formBtn}
                  onClick={() => setForm('login')}
                >
                  logIn
                </button>
              </p>
            </>
          )}
          {form === 'login' && (
            <>
              <LoginForm />
              <p className={styles.formText}>
                No account?{' '}
                <button
                  className={styles.formBtn}
                  onClick={() => setForm('register')}
                >
                  Register
                </button>{' '}
                now!
              </p>
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
