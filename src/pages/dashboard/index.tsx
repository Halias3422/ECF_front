import { API_ROUTES } from '@/api/routes';
import { getProtectedDataFromAPI } from '@/api/utils';
import DashboardMenuLink from '@/components/Dashboard/menus/DashboardMenuLink';
import Favicon from '@/components/Favicon/Favicon';
import UserContext from '@/context/UserContext';
import { merriweatherSans } from '@/styles/fonts';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const DashboardAccueilPage = () => {
  const { userContext } = useContext(UserContext);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const checkUserAuthorization = async () => {
    if (userContext.loggedIn && userContext.userSession) {
      const response = await getProtectedDataFromAPI(
        API_ROUTES.users.getUserRole,
        userContext.userSession
      );
      if (
        !response ||
        response.status !== 200 ||
        response.data.data.role !== 1
      ) {
        window.location.href = '/';
      }
      setIsAuthorized(true);
    } else {
      window.location.href = '/';
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (userContext.contextLoaded) {
      checkUserAuthorization();
      const menuContainer = document.getElementById(
        'dashboardMenuContainer'
      ) as HTMLDivElement;
      const headerContainer = document.getElementById(
        'dashboardHeaderContainer'
      ) as HTMLDivElement;
      if (menuContainer && headerContainer) {
        menuContainer.style.minHeight =
          document.documentElement.offsetHeight -
          200 -
          headerContainer.offsetHeight +
          'px';
      }
    }
  }, [userContext.contextLoaded]);

  if (isAuthorized) {
    return (
      <>
        <Head>
          <Favicon />
          <title>Dashboard Administrateur</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <header className="even">
          <HeaderContainer id="dashboardHeaderContainer" className="container">
            <h1 className={merriweatherSans.className}>
              Panel d'Administration
            </h1>
          </HeaderContainer>
        </header>
        <main>
          <section className="section odd">
            <MainMenuContainer
              id="dashboardMenuContainer"
              className="container"
            >
              <DashboardMenuLink />
            </MainMenuContainer>
          </section>
        </main>
      </>
    );
  } else {
    return <></>;
  }
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
`;

export default DashboardAccueilPage;
