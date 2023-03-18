import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Hero from '@/components/Hero/Hero';
import MainCTA from '@/components/MainCTA/MainCTA';
import Footer from '@/components/Sections/Footer/Footer';
import { DaySchedule } from '@/interfaces/schedule';

const Custom404 = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  return (
    <>
      <Hero
        header="Oups, cette page n'existe pas !"
        paragraphs={["Aucune information n'existe à cette adresse..."]}
        image="lost-direction.jpg"
        imageAlt="Retrouver son chemin"
        childComponents={[
          <MainCTA
            textContent="Retourner à l'accueil"
            url="/"
            theme="themeDarkGreen"
          />,
        ]}
        $textIsLeft={false}
        $isOdd={true}
      />
      <Footer weekSchedule={weekSchedule} />
    </>
  );
};

export const getStaticProps = async () => {
  const scheduleResponse = await getDataFromAPI(
    API_ROUTES.schedule.getWeekSchedule
  );
  const weekSchedule = scheduleResponse?.data;
  return {
    props: {
      weekSchedule,
    },
  };
};

export default Custom404;
