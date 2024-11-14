import { useRecoilState } from "recoil";
import { userState } from "../recoil/atom";
import { loginUser, logout } from "../utils/api";

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);

  const signIn = async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password);
    setUser(loggedInUser); // Store user data in Recoil state
  };

  const signOut = async () => {
    await logout();
    setUser(null); // Clear user state on logout
  };

  return { user, signIn, signOut };
};
