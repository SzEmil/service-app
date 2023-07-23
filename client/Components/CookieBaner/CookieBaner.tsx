import React, { useState } from 'react';
import css from './CookieBaner.module.css';

export const CookieBaner = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      {isModalOpen && (
        <div className={css.modal}>
          <button className={css.btn} onClick={() => setIsModalOpen(false)}>
            X
          </button>
          <p className={css.text}>
            We use a minimal amount of cookies to ensure the best experience on
            our website. If you continue to use this site we will assume that
            you are happy with it.
          </p>
        </div>
      )}
    </>
  );
};
