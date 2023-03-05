import { API_ROUTES } from '@/api/routes';
import { postDataToAPI } from '@/api/utils';
import { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import FormSubmit from '../FormSubmit/FormSubmit';
import MainCTA from '../MainCTA/MainCTA';

const SignInForm = () => {
  const [emailWarning, setEmailWarning] = useState<string>('');
  const [passwordWarning, setPasswordWarning] = useState<string>('');
  const [formWarning, setFormWarning] = useState<string>('');
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  //trigger reflow -> https://css-tricks.com/restart-css-animation/#aa-update-another-javascript-method-to-restart-a-css-animation
  const triggerErrorAnimation = () => {
    const form = document.querySelector('#signInForm') as HTMLFormElement;
    form?.classList.remove('errorShake');
    void form?.offsetWidth;
    form?.classList.add('errorShake');
  };

  const verifyLoginValues = (): boolean => {
    if (loginInfo.email.length === 0) {
      setEmailWarning('Veuillez renseigner une adresse mail');
      triggerErrorAnimation();
      return false;
    } else {
      setEmailWarning('');
    }
    if (loginInfo.password.length === 0) {
      setPasswordWarning('Veuillez renseigner un mot de passe');
      triggerErrorAnimation();
      return false;
    } else {
      setPasswordWarning('');
    }
    return true;
  };

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (verifyLoginValues()) {
      const res = await postDataToAPI(API_ROUTES.users.login, loginInfo);
      if (res === undefined || res.status !== 200) {
        setFormWarning('Adresse mail ou mot de passe incorrect');
        triggerErrorAnimation();
      } else if (res.status === 200) {
        setFormWarning('');
      }
    }
  };

  return (
    <SignInFormContainer
      id="signInForm"
      className="themeLightGreen"
      onSubmit={(event) => handleLoginSubmit(event)}
    >
      <InputContainer>
        <label htmlFor="mailInput">Adresse mail:</label>
        <FormInput
          type="email"
          id="mailInput"
          onChange={(event) =>
            setLoginInfo({ ...loginInfo, email: event.target.value })
          }
        />
        {emailWarning.length > 0 && <Warning>{emailWarning}</Warning>}
      </InputContainer>
      <InputContainer>
        <label htmlFor="passwordInput">Mot de passe:</label>
        <FormInput
          type="password"
          id="passwordInput"
          onChange={(event) =>
            setLoginInfo({ ...loginInfo, password: event.target.value })
          }
        />
        {passwordWarning.length > 0 && <Warning>{passwordWarning}</Warning>}
      </InputContainer>
      <Separator />
      <FormSubmit textContent="Connexion" theme="themeDarkGrey" />
      {formWarning.length > 0 && <Warning>{formWarning}</Warning>}
      <NoAccountParaph>Vous n'avez pas de compte ?</NoAccountParaph>
      <MainCTA
        textContent="Inscription"
        url="/inscription"
        theme="themeDarkGreen"
      />
    </SignInFormContainer>
  );
};

const SignInFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 10%;
  gap: 25px;
  width: 80%;
  margin-bottom: 42px;
  border-radius: 12px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  @media screen and (min-width: 1024px) {
  }
`;

const Warning = styled.p`
  color: darkRed;
  margin: 0;
  text-align: center;
`;

const Separator = styled.div`
  height: 20px;
`;

const FormInput = styled.input`
  max-width: 100%;
  min-width: 80%;
`;

const NoAccountParaph = styled.p`
  margin-bottom: -20px;
`;

export default SignInForm;
