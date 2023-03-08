import DashboardMenuLink from '@/components/Dashboard/DashboardMenuLink';
import { merriweatherSans } from '@/styles/fonts';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';

const DashboardAccueilPage = () => {
  const [openedConfigPanel, setOpenedConfigPanel] = useState<string>('');

  const displayOpenedConfigPanel = () => {
    switch (openedConfigPanel) {
      case 'Galerie dimages':
        return <></>;
      case 'La Carte':
        return <></>;
      case 'Les Menus':
        return <></>;
      case 'Réservations':
        return <></>;
      case 'Les Horaires':
        return <></>;
      case "Capacité d'accueil":
        return <></>;
      case 'La Carte':
        return <></>;
    }
  };
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <header className="even">
        <HeaderContainer className="container">
          <h1 className={merriweatherSans.className}>Panel d'Administration</h1>
        </HeaderContainer>
      </header>
      <main>
        <section className="section odd">
          <MainMenuContainer className="container">
            <DashboardMenuLink setOpenedConfigPanel={setOpenedConfigPanel} />
          </MainMenuContainer>
          {displayOpenedConfigPanel()}
        </section>
      </main>
    </>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 52px;
`;

const MainMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
  width: 100%;
  height: 50vh;
`;

export default DashboardAccueilPage;
