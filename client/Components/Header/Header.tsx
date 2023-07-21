import React from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';
import css from './Header.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/auth/authOperations';
import { nanoid } from 'nanoid';

type User = {
  user: {
    username: string | null;
    email: string | null;
    avatarURL: string | null;
  };
};

export const Header = ({ user }: User) => {
  const [userMenuOpen, setUserMenu] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const handleOnClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className={css.header}>
      {/* <p className={css.title}>SERVISE</p> */}
      <img className={css.title} src={'./logo-low.png'} alt="logo pic" />
      <nav>
        <div
          className={css.userIcon}
          onClick={() => setUserMenu(prevVal => !prevVal)}
        >
          <div className={css.user}>
            <p className={css.userName}>{user.username}</p>

            <BiSolidUserCircle size={'36px'} />
          </div>
        </div>
        {userMenuOpen && (
          <div className={css.userMenu}>
            <ul>
              <li key={nanoid()}>
                <button className={css.menuBtn} onClick={() => handleOnClickLogOut()}>LogOut</button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
