import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Sections/Footer/Footer';
import ReservationSection from '@/components/Sections/ReservationSection';
import { DaySchedule } from '@/interfaces/schedule';

const LesMenus = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  return (
    <>
      <Hero
        header="Le <b>Quai Antique</b> est fier de vous présenter ses menus"
        paragraphs={[
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta.',
        ]}
        image="images/menu.jpg"
        imageAlt="Un bon en-cas le temps de lire le menu"
        $isOdd
      />
      <ReservationSection theme="themeDarkGreen" $isOdd />
      <Footer weekSchedule={weekSchedule} />
    </>
  );
};

export default LesMenus;

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
