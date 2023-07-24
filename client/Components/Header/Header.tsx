import React from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';
import css from './Header.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/auth/authOperations';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { selectAuthUserInvitations } from '../../redux/auth/authSelectors';
import { invitationType } from '../../redux/auth/authSlice';
import { getInvitationsData } from '../../redux/auth/authOperations';
import { FiRefreshCcw } from 'react-icons/fi';

type User = {
  user: {
    username: string | null;
    email: string | null;
    avatarURL: string | null;
  };
};

export const Header = ({ user }: User) => {
  const [userMenuOpen, setUserMenu] = useState(false);
  const userInvitations = useSelector(selectAuthUserInvitations);

  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [invitationData, setInvitationData] = useState<invitationType | null>(
    null
  );
  const dispatch: AppDispatch = useDispatch();

  const handleOnClickLogOut = () => {
    dispatch(logOut());
  };

  const handleOnClickOpenInvitation = async (invitation: invitationType) => {
    setInvitationData(invitation);
    setIsInvitationOpen(true);
  };

  const cutDate = (date: string | null | undefined) => {
    const year = date!.slice(0, 10);
    const time = date!.slice(11, 16);

    return `${year}  ${time}`;
  };
  const handleOnClickRefreshInvitations = async () => {
    dispatch(getInvitationsData());
  };
  return (
    <header className={css.header}>
      {/* <p className={css.title}>SERVISE</p> */}
      <Link href={'/restaurants'}>
        <img className={css.title} src={'./logo-low.png'} alt="logo pic" />
      </Link>
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
                <button
                  className={css.menuBtn}
                  onClick={() => handleOnClickLogOut()}
                >
                  LogOut
                </button>
              </li>
              <li key={nanoid()}>
                <button
                  className={css.invitationButtonRefresh}
                  onClick={() => handleOnClickRefreshInvitations()}
                >
                  <FiRefreshCcw size={'24px'} />
                </button>
              </li>
              {userInvitations.map(invitation => (
                <li key={invitation._id}>
                  <div
                    className={css.invitationWrapper}
                    onClick={() => handleOnClickOpenInvitation(invitation)}
                  >
                    <p className={css.invitationText}>
                      New invite for restaurant {invitation.restaurantName}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      {isInvitationOpen && (
        <div className={css.inviteFormBackdrop}>
          <div className={css.inviteFormWrapper}>
            {invitationData !== null && (
              <div className={css.invitationBlock}>
                <button
                  className={` ${css.invitationCloseBtn}`}
                  onClick={() => setIsInvitationOpen(false)}
                >
                  X
                </button>
                <p className={css.invitationCreatedAt}>
                  {invitationData.createdAt}
                </p>
                <p className={css.invitationFormText}>
                  A user with an email {invitationData.sender} wants you to join
                  his restaurant {invitationData.restaurantName}
                </p>
                <button className={`${css.button} ${css.invitationAcceptBtn}`}>
                  Accept
                </button>
                <button className={`${css.button} ${css.invitationRejectBtn}`}>
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
