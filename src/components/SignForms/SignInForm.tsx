import { API_ROUTES } from '@/api/routes';
import { postDataToAPI } from '@/api/utils';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import FormSubmit from '../FormSubmit/FormSubmit';
import MainCTA from '../MainCTA/MainCTA';

const SignInForm = () => {
  const [emailWarning, setEmailWarning] = useState<string>('');
  const [passwordWarning, setPasswordWarning] = useState<string>('');
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const verifyLoginValues = (): boolean => {
    if (loginInfo.email.length === 0) {
      setEmailWarning('Veuillez renseigner une adresse mail');
      return false;
    } else {
      setEmailWarning('');
    }
    if (loginInfo.password.length === 0) {
      setPasswordWarning('Veuillez renseigner un mot de passe');
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
    }
  };

  return (
    <SignFormContainer
      className="themeLightGreen"
      onSubmit={(event) => handleLoginSubmit(event)}
    >
      <InputContainer>
        <label htmlFor="mailInput">Adresse mail:</label>
        <FormInput
          type="text"
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

      <NoAccountParaph>Vous n'avez pas de compte ?</NoAccountParaph>
      <MainCTA
        textContent="Inscription"
        url="/inscription"
        theme="themeDarkGreen"
      />
    </SignFormContainer>
  );
};

const SignFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 10%;
  gap: 25px;
  width: 80%;
  margin-bottom: 42px;
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
