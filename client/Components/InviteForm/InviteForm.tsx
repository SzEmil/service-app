import React from 'react';
import { FormEvent } from 'react';
import css from './InviteForm.module.css';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
export const InviteForm = ({ setIsInviteFormOpen }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // const credentials: credentialsLoginType = {
    //   email: (form.elements.namedItem('email') as HTMLInputElement).value,
    //   password: (form.elements.namedItem('password') as HTMLInputElement).value,
    // };

    form.reset();
  };
  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
      onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
    >
      <button
        className={`${css.button} ${css.buttonCancel}`}
        onClick={() => setIsInviteFormOpen(false)}
      >
        Cancel invitation
      </button>
      <h2 className={css.title}>Invite friend</h2>

      <div className={css.formGroup}>
        <label htmlFor="email" className={css.label}>
          Friend's email
        </label>
        <input type="text" name="email" className={css.input} required />
      </div>

      <button type="submit" className={css.button}>
        Send invitation
      </button>
    </form>
  );
};
