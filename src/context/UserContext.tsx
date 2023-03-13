import { UserLoginContext } from '@/interfaces/users';
import { createContext } from 'react';

const UserContext = createContext<UserLoginContext>({
  userContext: {
    contextLoaded: false,
    loggedIn: false,
    userSession: '',
  },
  setUserContext: () => {},
});

export default UserContext;
