import { API_ROUTES } from '@/api/routes';
import { postProtectedDataToAPI } from '@/api/utils';
import FormSubmitButtons from '@/components/Dashboard/menus/ItemActions/FormSubmitButtons';
import { UserLoginState } from '@/interfaces/users';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

const ModifyPasswordPopUp = ({
  userContext,
  setSelectedButton,
}: {
  userContext: UserLoginState;
  setSelectedButton: Dispatch<SetStateAction<string>>;
}) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formValues, setFormValues] = useState({
    newPassword: '',
    newPasswordCheck: '',
    password: '',
  });

  const handlePasswordModification = async () => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.users.updatePassword,
      formValues,
      userContext.userSession
    );
    setConfirm(false);
    if (response && response.status === 200) {
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
      if (formValues.newPassword !== formValues.newPasswordCheck) {
        setErrorMessage(
          'Erreur: Les nouveaux mots de passe renseignés sont différents'
        );
        const errorDisplay = document.getElementById(
          'submitError'
        ) as HTMLParagraphElement;
        errorDisplay.style.display = 'block';
        setConfirm(false);
        return;
      }
      handlePasswordModification();
    }
    setConfirm(false);
    if (cancel) {
      setCancel(false);
      setSelectedButton('');
    }
  }, [confirm, cancel]);
  return (
    <PasswordForm onSubmit={(e) => e.preventDefault()}>
      <h2>Modifier mon mot de passe</h2>

      <FormItem>
        <label htmlFor="newPasswordInput">Nouveau mot de passe: </label>
        <input
          type="password"
          onChange={(e) =>
            setFormValues({ ...formValues, newPassword: e.target.value })
          }
          required
        />
      </FormItem>
      <FormItem>
        <label htmlFor="newPasswordInput">
          Vérification nouveau mot de passe:{' '}
        </label>
        <input
          type="password"
          onChange={(e) =>
            setFormValues({ ...formValues, newPasswordCheck: e.target.value })
          }
          required
        />
      </FormItem>
      <FormItem>
        <label htmlFor="passwordInput">Mot de passe actuel:</label>
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
    </PasswordForm>
  );
};

const PasswordForm = styled.form`
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
  margin-top: 40px;
  font-size: 24px;
  text-align: center;
`;

export default ModifyPasswordPopUp;
