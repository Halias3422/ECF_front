import { Dispatch, SetStateAction } from 'react';

export interface UserSignUpInfo {
  email: string;
  password: string;
  secondPassword: string;
}

export interface UserOptionalInfo {
  email: string;
  defaultGuestNumber: number;
  defaultAllergies: string;
}

export interface UserLoginState {
  isLoggedIn: boolean;
  token: string;
}

export interface UserLoginContext {
  userContext: UserLoginState;
  setUserContext: Dispatch<SetStateAction<UserLoginState>>;
}
