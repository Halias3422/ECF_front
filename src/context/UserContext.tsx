import { UserLoginContext } from '@/interfaces/users';
import { createContext } from 'react';

const UserContext = createContext<UserLoginContext>({
  userContext: {
    isLoggedIn: false,
    token: '',
  },
  setUserContext: () => {},
});

export default UserContext;
