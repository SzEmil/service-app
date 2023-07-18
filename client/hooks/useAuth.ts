import { useSelector } from "react-redux";
import { selectAuthUserIsLoggedIn } from "../redux/auth/authSelectors";
import { selectAuthUserIsRefreshing } from "../redux/auth/authSelectors";

export const useAuth = () => {
    const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
    const isRefreshing = useSelector(selectAuthUserIsRefreshing);
  
    return {
      isLoggedIn,
      isRefreshing,
    };
  };