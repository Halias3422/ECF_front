import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Sections/Footer/Footer';
import MenusSection from '@/components/Sections/Menus/MenusSection';
import ReservationSection from '@/components/Sections/ReservationSection';
import { Menu } from '@/interfaces/menus';
import { DaySchedule } from '@/interfaces/schedule';

const MenusPage = ({
  weekSchedule,
  menus,
}: {
  weekSchedule: DaySchedule[];
  menus: Menu[];
}) => {
  return (
    <>
      <main>
        <Hero
          header="Le <b>Quai Antique</b> est fier de vous présenter ses menus"
          paragraphs={[
            "Nos menus sont pensés de la première à la dernière bouchée pour vous offrir une expérience cohérente, telle que le Chef Arnaud Michant l'a imaginé. Plusieurs formules au choix permettent à tous de personnaliser leur repas selon leurs envies.",
          ]}
          image="menu.webp"
          imageAlt="Un bon en-cas le temps de lire le menu"
          $isOdd
          $textIsLeft
        />
        <MenusSection menus={menus} $isOdd={false} />
        <ReservationSection theme="themeDarkGreen" $isOdd />
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
  const menusResponse = await getDataFromAPI(API_ROUTES.menus.getAllMenus);
  const menus = menusResponse?.data;
  return {
    props: {
      weekSchedule,
      menus,
    },
  };
};

export default MenusPage;
