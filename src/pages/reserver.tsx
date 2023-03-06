import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Hero from '@/components/Hero/Hero';
import ReservationForm from '@/components/ReservationForm/ReservationForm';
import Footer from '@/components/Sections/Footer/Footer';
import Section from '@/components/Sections/Section';
import { DaySchedule } from '@/interfaces/schedule';

const ReserverPage = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  return (
    <>
      <main>
        <Hero
          header="À quelques clics d'une <b>expérience</b> unique !"
          paragraphs={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes.',
          ]}
          image="images/service-is-ready.jpg"
          imageAlt="Le restaurant est prêt à vous acceuillir !"
          $textIsLeft={false}
          $isOdd={true}
        />
        <ReservationForm $isOdd={false} />
        <Section
          id="howDoesItWorkSection"
          header="Comment ça marche ?"
          paragraphs={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes.',
          ]}
          image="images/landline-phone.jpg"
          imageAlt="En cas de questions, appelez nous"
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
  const weekSchedule = scheduleResponse?.data;
  return {
    props: {
      weekSchedule,
    },
  };
};

export default ReserverPage;
