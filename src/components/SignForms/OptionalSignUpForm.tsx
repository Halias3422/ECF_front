import { roboto } from '@/styles/fonts';
import styled from 'styled-components';
import { FormEvent, useContext, useState } from 'react';
import FormSubmit from '../FormSubmit/FormSubmit';
import { UserOptionalInfo } from '../../interfaces/users';
import { postProtectedDataToAPI } from '@/api/utils';
import { API_ROUTES } from '@/api/routes';
import React from 'react';
import UserContext from '@/context/UserContext';

const OptionalSignUpForm = ({
  $mail,
  filledMandatoryInfo,
}: {
  $mail: string;
  filledMandatoryInfo: boolean;
}) => {
  const { userContext } = useContext(UserContext);
  const [optionalInfo, setOptionalInfo] = useState<UserOptionalInfo>({
    email: '',
    defaultGuestNumber: 1,
    defaultAllergies: '',
  });
  const [formWarning, setFormWarning] = useState<string>('');

  //trigger reflow -> https://css-tricks.com/restart-css-animation/#aa-update-another-javascript-method-to-restart-a-css-animation
  const triggerErrorAnimation = () => {
    const form = document.querySelector('#optionalInfoForm') as HTMLFormElement;
    form?.classList.remove('errorShake');
    void form?.offsetWidth;
    form?.classList.add('errorShake');
  };

  const handleOptionalInfoSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await postProtectedDataToAPI(
      API_ROUTES.users.updateOptionalInfo,
      {
        ...optionalInfo,
        email: $mail,
      },
      userContext.userSession
    );
    if (res === undefined || res.status !== 200) {
      setFormWarning('Erreur interne. Veuillez réessayer plus tard');
      triggerErrorAnimation();
    } else {
      setFormWarning('');
      window.location.href = '/';
    }
  };

  if (filledMandatoryInfo) {
    return (
      <OptionalInfoContainer
        id="optionalInfoForm"
        className="themeDarkGreen"
        onSubmit={(e) => handleOptionalInfoSubmit(e)}
      >
        <h3>Pour faciliter vos futures réservations (optionnel)</h3>
        <label htmlFor="defaultGuestNumber">
          Nombre de couverts par défaut:
        </label>
        <FormInput
          type="number"
          id="defaultGuestNumber"
          defaultValue={1}
          min={1}
          onChange={(event) =>
            setOptionalInfo({
              ...optionalInfo,
              defaultGuestNumber: parseInt(event.target.value),
            })
          }
        />
        <label htmlFor="defaultAllergies">Allergies ou autres demandes:</label>
        <DefaultAllergies
          className={roboto.className}
          id="defaultAllergies"
          onChange={(event) =>
            setOptionalInfo({
              ...optionalInfo,
              defaultAllergies: event.target.value,
            })
          }
        />
        <FormSubmit textContent="Confirmer" theme="themeDarkGrey" />
        {formWarning.length > 0 && <Warning>{formWarning}</Warning>}
      </OptionalInfoContainer>
    );
  }
  return <></>;
};

const OptionalInfoContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 30px 10%;
  border-radius: 12px;
  margin: 20px 0px;
  width: 80%;
  text-align: center;
`;

const FormInput = styled.input`
  width: 100%;
`;

const DefaultAllergies = styled.textarea`
  width: 100%;
  min-height: 150px;
`;

const Warning = styled.p`
  text-align: center;
  color: darkRed;
  margin: 0;
`;

export default OptionalSignUpForm;
