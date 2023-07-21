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
            Ta strona korzysta z plików cookies. Ich wykorzsytanie pozwala na
            poprawne działanie funkcjonalności na stronie
          </p>
        </div>
      )}
    </>
  );
};
