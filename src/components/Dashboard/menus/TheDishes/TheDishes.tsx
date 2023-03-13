import SvgImageGallery from '@/components/svgs/imageGallery';
import SvgLaCarte from '@/components/svgs/laCarte';
import SvgLesMenus from '@/components/svgs/lesMenus';
import { useState } from 'react';
import styled from 'styled-components';
import DashboardButton from '../DashboardButton';
import DishesGalleryDashboard from './DishesGallery/DishesGalleryDashboard';
import LaCarteDashboard from './LaCarte/LaCarteDashboard';
import LesMenusDashboard from './LesMenus/LesMenusDashboard';

const TheDishes = ({}: {}) => {
  const [openedConfigPanel, setOpenedConfigPanel] = useState<string>('');

  const displayOpenedConfigPanel = () => {
    switch (openedConfigPanel) {
      case "Galerie d'images":
        return <DishesGalleryDashboard />;
      case 'La Carte':
        return <LaCarteDashboard />;
      case 'Les Menus':
        return <LesMenusDashboard />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <PanelContainer
        className="dashboardMenuOpening"
        id="menuLinksContainer"
        $openedConfigPanel={openedConfigPanel}
      >
        <MenuContainer>
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
      </PanelContainer>
      {displayOpenedConfigPanel()}
    </>
  );
};

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3%;
`;

const PanelContainer = styled.div<{ $openedConfigPanel: string }>`
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
  ${(props) =>
    props.$openedConfigPanel.length > 0 &&
    `border-bottom: none; border-radius: 0px;`}
  border-top: 0px;
  overflow: hidden;
`;

export default TheDishes;
