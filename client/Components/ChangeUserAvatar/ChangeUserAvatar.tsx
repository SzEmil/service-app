import React, { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import css from './ChangeUserAvatar.module.css';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { createInvitation } from '../../redux/user/userOperations';
import { useRouter } from 'next/router';
import { changeUserAvatar } from '../../redux/user/userOperations';

export const ChangeUserAvatar = ({ setChangeProfileModalOpen }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData();
    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }

    const avatarData = {
      formData,
    };

    console.log(avatarData);
    dispatch(changeUserAvatar(avatarData));
    setChangeProfileModalOpen(false);
    form.reset();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    // Validate file format (accepts jpg, jpeg, and png)
    if (file && /\.(jpe?g|png)$/i.test(file.name)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
      onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
    >
      <button
        className={`${css.button} ${css.buttonCancel}`}
        onClick={() => setChangeProfileModalOpen(false)}
      >
        Cancel avatar modifications
      </button>
      <h2 className={css.title}>Change profile picture</h2>

      <div className={css.formGroup}>
        <label htmlFor="file" className={css.label}>
          Upload an image (JPG, JPEG, PNG)
        </label>
        <input
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className={css.input}
          required
        />
      </div>

      <button type="submit" className={css.button}>
        Submit changes
      </button>
    </form>
  );
};
