import { API_ROUTES } from '@/api/routes';
import { getProtectedDataFromAPI } from '@/api/utils';
import ConnexionInfosForm from '@/components/UserInfoDashboard/UserAccount/ConnexionInfosForm';
import UserContext from '@/context/UserContext';
import { UserOptionalInfo } from '@/interfaces/users';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const MyAccountDashboard = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState<UserOptionalInfo>();

  const getUserOptionalInfo = async () => {
    const response = await getProtectedDataFromAPI(
      API_ROUTES.users.getAuthenticatedProtectedUserFromSession,
      userContext.userSession
    );
    setUserInfo(response?.data[0]);
  };

  useEffect(() => {
    setUserContext(userContext);
    if (userContext.contextLoaded) {
      getUserOptionalInfo();
    }
  }, [userContext]);

  return (
    <PanelContainer className="dashboardMenuOpening" id="ClientsLinksContainer">
      <ConnexionInfosForm
        userInfo={userInfo as UserOptionalInfo}
        userContext={userContext}
        setUserContext={setUserContext}
      ></ConnexionInfosForm>
    </PanelContainer>
  );
};

const PanelContainer = styled.div`
  margin-top: -25px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-top: 50px;
  padding-bottom: 20px;
  gap: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  border-top: 0px;
  overflow: hidden;
`;

export default MyAccountDashboard;
