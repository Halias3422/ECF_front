import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Hero from '@/components/Hero/Hero';
import MainCTA from '@/components/MainCTA/MainCTA';
import Footer from '@/components/Sections/Footer/Footer';
import ReservationSection from '@/components/Sections/ReservationSection';
import Section from '@/components/Sections/Section';
import SignInForm from '@/components/SignForms/SignInForm';
import { DaySchedule } from '@/interfaces/schedule';

const ConnexionPage = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  return (
    <>
      <main>
        <Hero
          header="Contents de vous revoir !"
          paragraphs={[]}
          image="images/waiter-smiling.jpg"
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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes.',
            'consectetur adipiscing elit. Morbi at ante pharetra consectetur adipiscing.',
          ]}
          image="images/table-clients.jpg"
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
  const weekSchedule = scheduleResponse?.rows;
  return {
    props: {
      weekSchedule,
    },
  };
};

export default ConnexionPage;
