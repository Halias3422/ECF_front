import styled from 'styled-components';
import FormSubmit from '../FormSubmit/FormSubmit';
import MainCTA from '../MainCTA/MainCTA';

const SignInForm = () => {
  return (
    <SignFormContainer className="themeLightGreen">
      <InputContainer>
        <label htmlFor="mailInput">Adresse mail:</label>
        <FormInput type="text" id="mailInput" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="passwordInput">Mot de passe:</label>
        <FormInput type="password" id="passwordInput" />
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