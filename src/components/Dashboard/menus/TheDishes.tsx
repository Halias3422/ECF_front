import SvgImageGallery from '@/components/svgs/imageGallery';
import SvgLaCarte from '@/components/svgs/laCarte';
import SvgLesMenus from '@/components/svgs/lesMenus';
import styled from 'styled-components';
import DashboardLink from './DashboardLink';

const TheDishes = () => {
  return (
    <MenuContainer className="dashboardMenuOpening" id="menuLinksContainer">
      <DashboardLink
        title="Galerie d'images"
        svg={<SvgImageGallery />}
        url="/dashboard/galerie-images"
      />
      <DashboardLink
        title="La Carte"
        svg={<SvgLaCarte />}
        url="/dashboard/la-carte"
      />
      <DashboardLink
        title="Les Menus"
        svg={<SvgLesMenus />}
        url="/dashboard/les-menus"
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

export default TheDishes;
