import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Favicon from '@/components/Favicon/Favicon';
import Hero from '@/components/Hero/Hero';
import MainCTA from '@/components/MainCTA/MainCTA';
import Footer from '@/components/Sections/Footer/Footer';
import ReservationSection from '@/components/Sections/ReservationSection';
import Section from '@/components/Sections/Section';
import SignInForm from '@/components/SignForms/SignInForm';
import { DaySchedule } from '@/interfaces/schedule';
import Head from 'next/head';

const ConnexionPage = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  return (
    <>
      <Head>
        <title>Connexion - Le Quai Antique</title>
        <meta
          name="description"
          content="Connectez vous à votre compte client afin de faciliter la gestion de vos réservations."
        />
      </Head>
      <main>
        <Hero
          header="Impatients de vous revoir !"
          paragraphs={[]}
          image="waiter-smiling.webp"
          imageAlt="Notre serveuse Magalie vous attend"
          childComponents={[<SignInForm />]}
          $textIsLeft={false}
          $isOdd={true}
        />
        <ReservationSection theme="themeLightGreen" $isOdd={false} />
        <Section
          id="ItsSoMuchSimpler"
          header="C'est tellement plus simple !"
          paragraphs={[
            'Créez votre compte personnel et gagnez du temps ! Posséder un compte vous permettra de renseigner vos informations et requêtes par défaut lors de vos futures réservations.',
            'Vous pourrez également avoir accès à la liste de vos réservations.',
          ]}
          image="table-clients.webp"
          imageAlt="Pas de tracas, place au plaisir !"
          childComponents={[
            <MainCTA
              textContent="Inscription"
              url="/inscription"
              theme="themeDarkGreen"
            />,
          ]}
          $textIsLeft={true}
          $isOdd={true}
        />
      </main>
      <Footer weekSchedule={weekSchedule} />
    </>
  );
};

export const getStaticProps = async () => {
  const scheduleResponse = await getDataFromAPI(
    API_ROUTES.schedule.getWeekSchedule
  );
  const weekSchedule = scheduleResponse?.data || null;
  return {
    props: {
      weekSchedule,
    },
  };
};

export default ConnexionPage;
