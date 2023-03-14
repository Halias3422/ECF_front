import { API_ROUTES } from '@/api/routes';
import { postProtectedDataToAPI } from '@/api/utils';
import FormSubmit from '@/components/FormSubmit/FormSubmit';
import { UserLoginState, UserOptionalInfo } from '@/interfaces/users';
import colorscheme from '@/styles/colorscheme';
import { roboto } from '@/styles/fonts';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';

const OptionalInfosForm = ({
  userInfo,
  userContext,
}: {
  userInfo: UserOptionalInfo;
  userContext: UserLoginState;
}) => {
  const [requestState, setRequestState] = useState<string>('');

  const handleModifyUserOptionalInfo = async (event: FormEvent) => {
    event.preventDefault();
    const statusMessage = document.getElementById(
      'requestState'
    ) as HTMLParagraphElement;
    const response = await postProtectedDataToAPI(
      API_ROUTES.users.updateOptionalInfo,
      userInfo,
      userContext.userSession
    );
    if (response && response.status === 200) {
      setRequestState('Modifications enregistrées');
      statusMessage.style.color = colorscheme.darkGreen;
    } else {
      setRequestState('Erreur lors de la modification');
      statusMessage.style.color = 'darkRed';
    }
  };

  return (
    <UserDashboardContainer className="dashboardMenuOpening">
      <AccountInfoForm
        onSubmit={(e: FormEvent) => handleModifyUserOptionalInfo(e)}
      >
        <label htmlFor="defaultGuestNumber">
          Nombre de couverts par défaut:
        </label>
        <input
          type="number"
          id="defaultGuestNumber"
          name="defaultGuestNumber"
          defaultValue={userInfo.defaultGuestNumber}
          min="1"
          max="45"
        />
        <label htmlFor="defaultAllergies">Allergies ou autres demandes:</label>
        <DefaultAllergies
          className={roboto.className}
          id="defaultAllergies"
          name="defaultAllergies"
          defaultValue={userInfo.defaultAllergies}
        />
        <SubmitContainer>
          <FormSubmit textContent="Modifier" theme="themeDarkGreen" />
        </SubmitContainer>
        <p id="requestState">{requestState}</p>
      </AccountInfoForm>
    </UserDashboardContainer>
  );
};

const UserDashboardContainer = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  width: 80%;
`;

const AccountInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  input,
  textarea {
    margin-top: 10px;
    margin-bottom: 40px;
  }
  input {
    max-width: 100%;
  }
  p {
    font-size: 28px;
  }
`;

const DefaultAllergies = styled.textarea`
  height: 200px;
  min-height: fit-content;
  width: 100%;
  @media screen and (min-width: 769px) {
    width: 80%;
  }
`;

const SubmitContainer = styled.div`
  width: 250px;
`;

export default OptionalInfosForm;
