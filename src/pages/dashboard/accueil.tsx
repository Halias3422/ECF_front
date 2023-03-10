import DashboardMenuLink from '@/components/Dashboard/menus/DashboardMenuLink';
import UserContext from '@/context/UserContext';
import { merriweatherSans } from '@/styles/fonts';
import Head from 'next/head';
import { useContext } from 'react';
import styled from 'styled-components';

const DashboardAccueilPage = () => {
  const { userContext } = useContext(UserContext);

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
            <DashboardMenuLink />
          </MainMenuContainer>
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
  min-height: 50vh;
`;

export default DashboardAccueilPage;
