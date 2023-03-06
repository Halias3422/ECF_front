import { API_ROUTES } from '@/api/routes';
import { postDataToAPI } from '@/api/utils';
import UserContext from '@/context/UserContext';
import { UserSignUpInfo } from '@/interfaces/users';
import axios from 'axios';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';
import FormSubmit from '../FormSubmit/FormSubmit';

const SignUpForm = ({
  signUpInfo,
  setSignUpInfo,
  filledMandatoryInfo,
  setFilledMandatoryInfo,
}: {
  signUpInfo: UserSignUpInfo;
  setSignUpInfo: Dispatch<SetStateAction<UserSignUpInfo>>;
  filledMandatoryInfo: boolean;
  setFilledMandatoryInfo: Dispatch<SetStateAction<boolean>>;
}) => {
  const [emailWarning, setEmailWarning] = useState<string>('');
  const [passwordWarning, setPasswordWarning] = useState<string>('');
  const [formWarning, setFormWarning] = useState<string>('');
  const { setUserContext } = useContext(UserContext);

  const verifySignUpValues = () => {
    if (!signUpInfo.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailWarning('Veuillez renseigner une adresse mail valide');
      return false;
    } else {
      setEmailWarning('');
    }
    if (
      signUpInfo.password.length < 8 ||
      signUpInfo.password.length > 99 ||
      !signUpInfo.password.match(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
      )
    ) {
      setPasswordWarning('Veuillez renseigner un mot de passe valide');
      return false;
    } else {
      setPasswordWarning('');
    }
    if (signUpInfo.password !== signUpInfo.secondPassword) {
      setPasswordWarning('Les deux mots de passe ne correspondent pas');
      return false;
    } else {
      setPasswordWarning('');
    }
    return true;
  };

  //trigger reflow -> https://css-tricks.com/restart-css-animation/#aa-update-another-javascript-method-to-restart-a-css-animation
  const triggerErrorAnimation = () => {
    const form = document.querySelector('#signUpForm') as HTMLFormElement;
    form?.classList.remove('errorShake');
    void form?.offsetWidth;
    form?.classList.add('errorShake');
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (verifySignUpValues()) {
      const res = await postDataToAPI(API_ROUTES.users.signup, signUpInfo);
      if (res === undefined || res.status !== 201) {
        triggerErrorAnimation();
      }
      if (res === undefined || res.status === 500) {
        setFormWarning('Erreur interne. Veuillez réessayer plus tard');
      } else if (res.status === 400) {
        if (JSON.stringify(res.data).includes('duplicate')) {
          setFormWarning('Adresse mail déjà liée à un compte');
        } else {
          setFormWarning('Erreur, identifiants non conformes');
        }
      } else if (res.status === 201) {
        setFilledMandatoryInfo(true);
        setFormWarning('');
        localStorage.setItem(
          'session',
          `{"token": "${res.data.data[0].token}", "id": "${res.data.data[0].id.data}"}`
        );
        setUserContext({
          token: res.data.data[0].token,
          id: res.data.data[0].id.data,
        });
      }
    } else {
      triggerErrorAnimation();
    }
  };

  if (!filledMandatoryInfo) {
    return (
      <SignUpFormContainer
        id="signUpForm"
        className="themeLightGreen"
        onSubmit={(event) => handleFormSubmit(event)}
      >
        <MandatorySignUpInfo>
          <SignUpInfoItem>
            <label htmlFor="mailInput">Adresse mail:</label>
            <FormInput
              type="text"
              id="mailInput"
              onChange={(event) =>
                setSignUpInfo({ ...signUpInfo, email: event.target.value })
              }
            />
            {emailWarning.length > 0 && <Warning>{emailWarning}</Warning>}
          </SignUpInfoItem>
          <SignUpInfoItem>
            <label htmlFor="passwordInput">Mot de passe:</label>
            <FormInput
              type="password"
              id="passwordInput"
              onChange={(event) =>
                setSignUpInfo({ ...signUpInfo, password: event.target.value })
              }
            />
            {passwordWarning.length > 0 && <Warning>{passwordWarning}</Warning>}
          </SignUpInfoItem>
          <SignUpInfoItem>
            <label htmlFor="passwordConfirmationInput">
              Confirmation
              <br /> mot de passe:
            </label>
            <FormInput
              type="password"
              id="passwordConfirmationInput"
              onChange={(event) =>
                setSignUpInfo({
                  ...signUpInfo,
                  secondPassword: event.target.value,
                })
              }
            />
          </SignUpInfoItem>
          <Divider />
          <FormSubmit textContent="Inscription" theme="themeDarkGrey" />
          {formWarning.length > 0 && <Warning>{formWarning}</Warning>}
        </MandatorySignUpInfo>
      </SignUpFormContainer>
    );
  }
  return <></>;
};

const SignUpFormContainer = styled.form`
  border-radius: 12px;
  margin-bottom: 42px;
  @media screen and (min-width: 1025px) {
    margin-bottom: 0px;
  }
`;

const MandatorySignUpInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 50px 10%;
`;

const SignUpInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const Warning = styled.p`
  text-align: center;
  color: darkRed;
  margin: 0;
`;

const Divider = styled.div``;

const FormInput = styled.input`
  width: 100%;
`;

export default SignUpForm;
