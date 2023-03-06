import { UserLoginContext } from '@/interfaces/users';
import { createContext } from 'react';

const UserContext = createContext<UserLoginContext>({
  userContext: {
    loggedIn: false,
    userSession: '',
  },
  setUserContext: () => {},
});

export default UserContext;
