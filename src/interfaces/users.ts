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
