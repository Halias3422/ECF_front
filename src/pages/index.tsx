import { InferGetStaticPropsType } from 'next';
import Hero from '@/components/Hero/Hero';
import StrongPointsList from '@/components/StrongPointsList/StrongPointsList';
import MainCTA from '@/components/MainCTA/MainCTA';
import { getDataFromAPI } from '@/api/utils';
import { API_ROUTES } from '@/api/routes';
import Section from '@/components/Sections/Section';
import GalleryDishes from '@/components/Sections/GalleryDishes/GalleryDishes';
import ReservationSection from '@/components/Sections/ReservationSection';
import Footer from '@/components/Sections/Footer/Footer';

export default function Home({
  galleryDishes,
  weekSchedule,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <main>
        <Hero
          header={'Le <b>Quai Antique</b>'}
          paragraphs={[
            '<i>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta.</i>',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante ',
          ]}
          image="le-quai-antique-exterieur.jpg"
          imageAlt="Photo du restaurant."
          $isOdd={true}
          $textIsLeft
        />
        <Section
          id="strongPointsSection"
          header={'Nos points forts'}
          paragraphs={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes.',
          ]}
          image="chef-cuisinant.jpg"
          imageAlt="Le Chef au travail."
          childComponents={[
            <StrongPointsList />,
            <MainCTA
              textContent="Qu'attendez-vous ?"
              url="/reserver"
              theme="themeLightGreen"
            />,
          ]}
          $textIsLeft={false}
          $isOdd={false}
        />
        <GalleryDishes $isOdd={true} galleryDishes={galleryDishes} />
        <ReservationSection theme="themeLightGreen" $isOdd={false} />
        <Section
          id="subscribeSection"
          header="C'est tellement plus simple !"
          paragraphs={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes.',
            'consectetur adipiscing elit. Morbi at ante pharetra consectetur adipiscing.',
          ]}
          image="table-clients.jpg"
          imageAlt="clients attablés"
          childComponents={[
            <MainCTA
              textContent="Inscription"
              url="/inscription"
              theme="themeDarkGreen"
            />,
          ]}
          $textIsLeft
          $isOdd
        />
      </main>
      <Footer weekSchedule={weekSchedule} />
    </>
  );
}

export const getStaticProps = async () => {
  const galleryResponse = await getDataFromAPI(
    API_ROUTES.dishesGallery.getAllDishes
  );
  const galleryDishes = galleryResponse?.data;
  const scheduleResponse = await getDataFromAPI(
    API_ROUTES.schedule.getWeekSchedule
  );
  const weekSchedule = scheduleResponse?.data;
  return {
    props: {
      galleryDishes,
      weekSchedule,
    },
  };
};
