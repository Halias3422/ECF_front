import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Hero from '@/components/Hero/Hero';
import ReservationForm from '@/components/ReservationForm/ReservationForm';
import { DaySchedule } from '@/interfaces/schedule';

const ReserverPage = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  return (
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
    </main>
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
