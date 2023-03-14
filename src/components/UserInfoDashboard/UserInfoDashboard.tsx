import { UserLoginState, UserOptionalInfo } from '@/interfaces/users';
import { useState } from 'react';
import styled from 'styled-components';
import DashboardButton from '../Dashboard/menus/DashboardButton';
import SvgAccountInfo from '../svgs/accountInfo';
import SvgReservations from '../svgs/reservations';
import UserAccountInfoDashboard from './UserAccount/UserAccountInfoDashboard';
import UserReservationsDashboard from './UserReservationsDashboard';

const UserInfoDashboard = ({
  userInfo,
  userContext,
}: {
  userInfo: UserOptionalInfo | undefined;
  userContext: UserLoginState;
}) => {
  const [openedConfigPanel, setOpenedConfigPanel] = useState<string>('');

  const displayOpenedConfigPanel = () => {
    switch (openedConfigPanel) {
      case 'Mes réservations':
        return <UserReservationsDashboard />;
      case 'Mes informations':
        return (
          <UserAccountInfoDashboard
            userInfo={userInfo}
            userContext={userContext}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      <UserDashboardContainer
        className="dashboardMenuOpening"
        id="userAccountConfigPanelContainer"
        $openedConfigPanel={openedConfigPanel}
      >
        <MenuContainer>
          <DashboardButton
            title="Mes réservations"
            svg={<SvgReservations />}
            setOpenedConfigPanel={setOpenedConfigPanel}
          />
          <DashboardButton
            title="Mes informations"
            svg={<SvgAccountInfo />}
            setOpenedConfigPanel={setOpenedConfigPanel}
          />
        </MenuContainer>
      </UserDashboardContainer>
      {displayOpenedConfigPanel()}
    </>
  );
};

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3%;
`;

const UserDashboardContainer = styled.div<{ $openedConfigPanel: string }>`
  margin-top: -25px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-top: 50px;
  padding-bottom: 20px;
  gap: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export default UserInfoDashboard;
