import styles from './LoginForm.module.css';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logIn } from '../../redux/user/userOperations';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/user/userSelectors';
import { getInvitationsData } from '../../redux/user/userOperations';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import { selectAuthUserIsLoading } from '../../redux/user/userSelectors';

type credentialsLoginType = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const isLoading = useSelector(selectAuthUserIsLoading);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const credentials: credentialsLoginType = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };

    await dispatch(logIn(credentials));
    dispatch(getInvitationsData());
    form.reset();
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>LogIn now!</h2>
        <p className={styles.error}>{authUser.error}</p>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          LogIn
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
