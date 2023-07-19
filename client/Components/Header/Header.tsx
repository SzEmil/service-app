import React from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';
import css from './Header.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/auth/authOperations';

type User = {
  user: {
    username: string | null;
    email: string | null;
    avatarURL: string | null;
  };
};
type HeaderProps = {
  user: User;
};

export const Header = ({ user }: HeaderProps) => {
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
          <BiSolidUserCircle size={'36px'} />
        </div>
        {userMenuOpen && (
          <div className={css.userMenu}>
            <ul>
              <li>
                <button onClick={() => handleOnClickLogOut()}>LogOut</button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
