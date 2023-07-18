import styles from './LoginForm.module.css';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logIn } from '../../redux/auth/authOperations';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/authSelectors';

type credentialsLoginType = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const credentials: credentialsLoginType = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };

    dispatch(logIn(credentials));
    form.reset();
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>LogIn now!</h2>
      <p>{authUser.error}</p>
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
  );
};

export default LoginForm;
