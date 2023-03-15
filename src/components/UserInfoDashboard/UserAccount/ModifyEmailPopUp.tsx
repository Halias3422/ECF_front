import { API_ROUTES } from '@/api/routes';
import { postProtectedDataToAPI } from '@/api/utils';
import FormSubmitButtons from '@/components/Dashboard/menus/ItemActions/FormSubmitButtons';
import { UserLoginState, UserOptionalInfo } from '@/interfaces/users';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

const ModifyEmailPopUp = ({
  userInfo,
  userContext,
  setUserContext,
  setSelectedButton,
}: {
  userInfo: UserOptionalInfo;
  userContext: UserLoginState;
  setUserContext: Dispatch<SetStateAction<UserLoginState>>;
  setSelectedButton: Dispatch<SetStateAction<string>>;
}) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formValues, setFormValues] = useState({
    email: userInfo.email,
    password: '',
  });

  const handleMailModification = async () => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.users.updateMail,
      formValues,
      userContext.userSession
    );
    setConfirm(false);
    if (response && response.status === 200) {
      localStorage.setItem('lqa_user_session', response.data.session);
      setUserContext({
        loggedIn: true,
        userSession: response.data.session,
        contextLoaded: true,
      });
      setSelectedButton('success');
    } else {
      setErrorMessage('Erreur: ' + response?.data.response);
      const errorDisplay = document.getElementById(
        'submitError'
      ) as HTMLParagraphElement;
      errorDisplay.style.display = 'block';
    }
  };

  useEffect(() => {
    if (confirm) {
      handleMailModification();
    }
    setConfirm(false);
    if (cancel) {
      setCancel(false);
      setFormValues({ email: '', password: '' });
      setSelectedButton('');
    }
  }, [confirm, cancel]);
  return (
    <MailForm>
      <h2>Modifier mon adresse mail</h2>

      <FormItem>
        <label htmlFor="mailInput">Nouvelle adresse mail: </label>
        <input
          type="text"
          defaultValue={userInfo.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          required
        />
      </FormItem>
      <FormItem>
        <label htmlFor="passwordInput">Mot de passe:</label>
        <input
          type="password"
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          required
        />
        <ErrorMessage id="submitError">{errorMessage}</ErrorMessage>
      </FormItem>
      <FormItem>
        <FormSubmitButtons setConfirm={setConfirm} setCancel={setCancel} />
      </FormItem>
    </MailForm>
  );
};

const MailForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const FormItem = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ErrorMessage = styled.p`
  display: none;
  color: darkRed;
  margin: 0px;
  font-size: 24px;
`;

export default ModifyEmailPopUp;
