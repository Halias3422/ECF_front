import SvgLesHoraires from '@/components/svgs/lesHoraires';
import SvgNumberClients from '@/components/svgs/numberClients';
import styled from 'styled-components';
import DashboardLink from './DashboardLink';

const TheRestaurant = () => {
  return (
    <MenuContainer className="dashboardMenuOpening" id="menuLinksContainer">
      <DashboardLink
        title="Les Horaires"
        svg={<SvgLesHoraires />}
        url="/dashboard/les-horaires"
      />
      <DashboardLink
        title="Capacité d'accueil"
        svg={<SvgNumberClients />}
        url="/dashboard/capacite-d-accueil"
      />
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  margin-top: -25px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  display: flex;
  justify-content: center;
  gap: 1%;
  padding-top: 50px;
  padding-bottom: 20px;
  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  border-top: 0px;
  overflow: hidden;
`;

export default TheRestaurant;
