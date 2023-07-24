import styles from './RegisterForm.module.css';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { register } from '../../redux/user/userOperations';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/user/userSelectors';
import { getInvitationsData } from '../../redux/user/userOperations';

type credentialsRegisterType = {
  username: string;
  email: string;
  password: string;
};
const RegisterForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const credentials: credentialsRegisterType = {
      username: (form.elements.namedItem('username') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };

    await dispatch(register(credentials));
    dispatch(getInvitationsData());
    form.reset();
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Register now!</h2>
      <p className={styles.error}>{authUser.error}</p>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.input}
          required
        />
      </div>
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
