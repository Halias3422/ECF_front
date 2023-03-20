import BackgroundPopUp from '@/components/Dashboard/menus/ItemActions/BackgroundPopUp';
import { UserLoginState, UserOptionalInfo } from '@/interfaces/users';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import ModifyEmailPopUp from './ModifyEmailPopUp';
import ModifyPasswordPopUp from './ModifyPasswordPopUp';

const ConnexionInfosForm = ({
  userInfo,
  userContext,
  setUserContext,
}: {
  userInfo: UserOptionalInfo;
  userContext: UserLoginState;
  setUserContext: Dispatch<SetStateAction<UserLoginState>>;
}) => {
  const [selectedButton, setSelectedButton] = useState<string>('');

  return (
    <UserDashboardContainer className="dashboardMenuOpening">
      <h3>Modifier:</h3>
      <ButtonsContainer>
        <div className="raiseOnHover">
          <Button
            className="themeSnow"
            onClick={() => setSelectedButton('email')}
          >
            <h3>Mon adresse mail</h3>
          </Button>
        </div>
        <div className="raiseOnHover">
          <Button
            className="themeSnow"
            onClick={() => setSelectedButton('password')}
          >
            <h3>Mon mot de passe</h3>
          </Button>
        </div>
      </ButtonsContainer>
      {selectedButton === 'email' && (
        <BackgroundPopUp>
          <ModifyEmailPopUp
            userInfo={userInfo}
            userContext={userContext}
            setUserContext={setUserContext}
            setSelectedButton={setSelectedButton}
          />
        </BackgroundPopUp>
      )}
      {selectedButton === 'password' && (
        <BackgroundPopUp>
          <ModifyPasswordPopUp
            userContext={userContext}
            setSelectedButton={setSelectedButton}
          />
        </BackgroundPopUp>
      )}
      {selectedButton === 'success' && (
        <SuccessStatus>La propriété a été modifiée avec succès</SuccessStatus>
      )}
    </UserDashboardContainer>
  );
};
const UserDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5%;
  margin: 60px 0px;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  @media screen and (min-width: 769px) {
    flex-direction: row;
    justify-content: center;
    gap: 5%;
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: ${(props) => `2px solid ${props.theme.darkGrey}`};
  border-radius: 12px;
  padding: 10px 3%;
  width: 200px;
  min-height: 120px;
  overflow: hidden;
`;

const SuccessStatus = styled.p`
  margin-top: 60px;
  color: ${(props) => props.theme.darkGreen};
  font-size: 28px;
`;

export default ConnexionInfosForm;
