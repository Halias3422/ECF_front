import { UserLoginContext } from '@/interfaces/users';
import { createContext } from 'react';

const UserContext = createContext<UserLoginContext>({
  userContext: {
    id: '',
    token: '',
  },
  setUserContext: () => {},
});

export default UserContext;
