import SvgTriangleDown from '@/components/svgs/triangleDown';
import SvgTriangleLeft from '@/components/svgs/triangleLeft';
import { UserLoginState, UserOptionalInfo } from '@/interfaces/users';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import ConnexionInfosForm from './ConnexionInfosForm';
import OptionalInfosForm from './OptionalInfosForm';

const UserAccountInfoDashboard = ({
  userInfo,
  userContext,
  setUserContext,
}: {
  userInfo: UserOptionalInfo | undefined;
  userContext: UserLoginState;
  setUserContext: Dispatch<SetStateAction<UserLoginState>>;
}) => {
  const [optionalMenuOpen, setOptionalMenuOpen] = useState<boolean>(false);
  const [connexionMenuOpen, setConnexionMenuOpen] = useState<boolean>(false);
  if (!userInfo) {
    return <></>;
  }
  return (
    <>
      <UserSubMenuContainer className="dashboardMenuOpening">
        <HeaderContainer
          onClick={() => setOptionalMenuOpen(!optionalMenuOpen)}
          className={optionalMenuOpen ? 'themeDarkBlue' : 'themeSnow'}
        >
          <h2>Mes informations optionnelles</h2>
          {optionalMenuOpen ? <SvgTriangleDown /> : <SvgTriangleLeft />}
        </HeaderContainer>
        {optionalMenuOpen && (
          <OptionalInfosForm userInfo={userInfo} userContext={userContext} />
        )}
      </UserSubMenuContainer>
      <UserSubMenuContainer className="dashboardMenuOpening">
        <HeaderContainer
          onClick={() => setConnexionMenuOpen(!connexionMenuOpen)}
          className={connexionMenuOpen ? 'themeDarkBlue' : 'themeSnow'}
        >
          <h2>Mes informations de connexion</h2>
          {connexionMenuOpen ? <SvgTriangleDown /> : <SvgTriangleLeft />}
        </HeaderContainer>
        {connexionMenuOpen && (
          <ConnexionInfosForm
            userInfo={userInfo}
            userContext={userContext}
            setUserContext={setUserContext}
          />
        )}
      </UserSubMenuContainer>
    </>
  );
};

const UserSubMenuContainer = styled.article`
  margin-top: 60px;
  width: 100%;
  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  border-radius: 48px;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  padding-top: 38px;
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
`;

export default UserAccountInfoDashboard;
