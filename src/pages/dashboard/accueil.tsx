import DashboardLink from '@/components/Dashboard/DashboardLink';
import DashboardMenuLink from '@/components/Dashboard/DashboardMenuLink';
import SvgImageGallery from '@/components/svgs/imageGallery';
import SvgLaCarte from '@/components/svgs/laCarte';
import SvgLesHoraires from '@/components/svgs/lesHoraires';
import SvgLesMenus from '@/components/svgs/lesMenus';
import SvgNumberClients from '@/components/svgs/numberClients';
import SvgReservations from '@/components/svgs/reservations';
import { merriweatherSans } from '@/styles/fonts';
import Head from 'next/head';
import styled from 'styled-components';

const DashboardAccueilPage = () => {
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
            {/*<SectionHeader className="themeSnow">
              Gestion du contenu du site
            </SectionHeader>
            <LinksContainer>
              <DashboardLink
                title="Gallerie d'images"
                svg={<SvgImageGallery />}
                url="/dashboard/gallerie-images"
              />
              <DashboardLink
                title="La Carte"
                url="/dashboard/la-carte"
                svg={<SvgLaCarte />}
              />
              <DashboardLink
                title="Les Menus"
                url="/dashboard/les-menus"
                svg={<SvgLesMenus />}
              />
            </LinksContainer>
            <h3></h3>
            <LinksContainer>
              <DashboardLink
                title="Les Horaires"
                url="/dashboard/les-horaires"
                svg={<SvgLesHoraires />}
              />
              <DashboardLink
                title="Capacité d'accueil"
                url="/dashboard/capacite-d-accueil"
                svg={<SvgNumberClients />}
              />
              <DashboardLink
                title="Réservations"
                url="/dashboard/reservations"
                svg={<SvgReservations />}
              />
            </LinksContainer>*/}
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
  height: 50vh;
`;

const MenuLinksContainer = styled.div``;

const SectionHeader = styled.h2`
  border: ${(props) => `2px solid ${props.theme.darkGrey}`};
  border-radius: 48px;
  text-align: center;
  padding: 25px 5%;
  margin: 0;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2%;
  width: 100%;
  justify-content: center;
`;

export default DashboardAccueilPage;
