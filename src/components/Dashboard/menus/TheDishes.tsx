import SvgImageGallery from '@/components/svgs/imageGallery';
import SvgLaCarte from '@/components/svgs/laCarte';
import SvgLesMenus from '@/components/svgs/lesMenus';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import styled from 'styled-components';
import DashboardButton from './DashboardButton';

const TheDishes = ({
  setOpenedConfigPanel,
}: {
  setOpenedConfigPanel: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <MenuContainer className="dashboardMenuOpening" id="menuLinksContainer">
      <DashboardButton
        title="Galerie d'images"
        svg={<SvgImageGallery />}
        setOpenedConfigPanel={setOpenedConfigPanel}
      />
      <DashboardButton
        title="La Carte"
        svg={<SvgLaCarte />}
        setOpenedConfigPanel={setOpenedConfigPanel}
      />
      <DashboardButton
        title="Les Menus"
        svg={<SvgLesMenus />}
        setOpenedConfigPanel={setOpenedConfigPanel}
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
