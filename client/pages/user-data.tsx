import axios from 'axios';
import css from '../styles/user-data.module.css';
type UserDataType = {
  _id: string | null;
  email: string | null;
  subscription: string | null;
};

type UserDataProps = {
  userData: UserDataType[];
};

const UserData = ({ userData }: UserDataProps) => {
  return (
    <div>
      {userData.map(user => (
        <div key={user._id}>
          <h1 className={css.title}>{user._id}</h1>
          <p>{user.email}</p>
          <p>{user.subscription}</p>
          <p>hi</p>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:3001/api/users');
    const data = response.data;
    const userData = data.ResponseBody.users;

    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        userData: [],
      },
    };
  }
}

export default UserData;
