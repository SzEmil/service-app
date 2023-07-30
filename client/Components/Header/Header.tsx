import React from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';
import css from './Header.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/user/userOperations';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { selectAuthUserInvitations } from '../../redux/user/userSelectors';
import { invitationType } from '../../redux/user/userSlice';
import { getInvitationsData } from '../../redux/user/userOperations';
import { FiRefreshCcw } from 'react-icons/fi';
import { rejectInvitation } from '../../redux/user/userOperations';
import { acceptInvitation } from '../../redux/user/userOperations';
import { refreshRestaurantsData } from '../../redux/restaurants/restaurantsOperations';
import { useRouter } from 'next/router';
import { setClearRestaurants } from '../../redux/restaurants/restaurantsSlice';

type User = {
  user: {
    username: string | null;
    email: string | null;
    avatarURL: string | undefined;
  };
};
export const imageSrc = 'http://localhost:3001';
// export const imageSrc = "https://github.com/SzEmil/service-app/tree/dev";
// export const imageSrc = "https://github.com/SzEmil/service-app";
export const Header = ({ user }: User) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [userMenuOpen, setUserMenu] = useState(false);
  const userInvitations = useSelector(selectAuthUserInvitations);

  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [invitationData, setInvitationData] = useState<invitationType | null>(
    null
  );

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menuWrapper = document.getElementById('userMenuOptionsWrapper');
      const menuBtn = document.getElementById('userMenuBtn');

      if (
        menuWrapper &&
        !menuBtn?.contains(target) &&
        !menuWrapper.contains(target)
      ) {
        setUserMenu(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleOnClickLogOut = () => {
    router.push('/');
    dispatch(setClearRestaurants());
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

  const handleOnClickRejectInvitation = (id: string | null | undefined) => {
    const idToDelete = {
      invitationId: id,
    };
    setIsInvitationOpen(false);
    dispatch(rejectInvitation(idToDelete));
  };
  const handleOnClickAcceptInvitation = async (
    id: string | null | undefined
  ) => {
    const idToAccept = {
      invitationId: id,
    };
    setIsInvitationOpen(false);
    await dispatch(acceptInvitation(idToAccept));
    dispatch(refreshRestaurantsData());
  };

  const handleMakeImageURL = (userAvatarURL: String | undefined) => {
    return `${imageSrc}/${userAvatarURL}`;
  };

  const userImage = handleMakeImageURL(user.avatarURL);
  return (
    <header className={css.header}>
      {/* <p className={css.title}>SERVISE</p> */}
      <Link href={'/restaurants'}>
        <img className={css.title} src={'./logo-low.png'} alt="logo pic" />
      </Link>
      <nav>
        <div
          id="userMenuBtn"
          className={css.userIcon}
          onClick={() => setUserMenu(prevVal => !prevVal)}
        >
          <div className={css.user}>
            <p className={css.userName}>{user.username}</p>
            {userImage ? (
              <img
                className={css.colabolatorImage}
                src={userImage}
                alt="user pic"
              />
            ) : (
              <BiSolidUserCircle size={'36px'} />
            )}
          </div>
        </div>
        {userMenuOpen && (
          <div className={css.userMenu} id="userMenuOptionsWrapper">
            <ul className={css.userNav}>
              <li key={nanoid()}>
                <button
                  className={css.menuBtn}
                  onClick={() => handleOnClickLogOut()}
                >
                  LogOut
                </button>
              </li>
            </ul>

            <ul className={css.invitationsBlock}>
              <li key={nanoid()}>
                <div className={css.userInvitationsBtnWrapper}>
                  <p className={css.invitationsTitle}>User invitations</p>
                  <button
                    className={css.invitationButtonRefresh}
                    onClick={() => handleOnClickRefreshInvitations()}
                  >
                    <FiRefreshCcw size={'24px'} />
                  </button>
                </div>
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
                <div className={css.invitationFormHeader}>
                  <p className={css.invitationCreatedAt}>
                    {cutDate(invitationData.createdAt)}
                  </p>
                  <button
                    className={` ${css.invitationCloseBtn}`}
                    onClick={() => setIsInvitationOpen(false)}
                  >
                    X
                  </button>
                </div>
                <p className={css.invitationFormText}>
                  A user with an email {invitationData.sender} wants you to join
                  his restaurant {invitationData.restaurantName}.
                </p>
                <div className={css.invitationFormButtonsWrapper}>
                  <button
                    onClick={() =>
                      handleOnClickAcceptInvitation(invitationData._id)
                    }
                    className={`${css.button} ${css.invitationAcceptBtn}`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleOnClickRejectInvitation(invitationData._id)
                    }
                    className={`${css.button} ${css.invitationRejectBtn}`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
