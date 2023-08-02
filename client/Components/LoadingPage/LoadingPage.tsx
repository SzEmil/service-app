import React from 'react';
import css from './LoadingPage.module.css';
import { RotatingLines } from 'react-loader-spinner';
export const LoadingPage = () => {
  return (
    <div className={css.pageWrapper}>
      <div className={css.loaderWrapper}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    </div>
  );
};
