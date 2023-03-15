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
            "<i>Découvrez l'univers culinaire du Chef Arnaud Michant. Une réinvention élégante et sans artifices de la cuisine traditionnelle savoyarde.</i>",
            'Notre équipe passionnée et expérimentée vous attend avec impatience pour vous faire vivre une expérience gastronomique inoubliable dans un cadre chaleureux. Venez découvrir le savoir-faire unique du Quai Antique en plein centre de Chambéry.',
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
            "Le Quai Antique est bien plus qu'un simple restaurant. Laissez-nous vous démontrer pourquoi. Vous n'aurez plus qu'à venir nous rendre visite pour vérifier par vous-mêmes !",
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
            'Créez votre compte personnel et gagnez du temps ! Posséder un compte vous permettra de renseigner vos informations et requêtes par défaut lors de vos futures réservations.',
            'Vous pourrez également avoir accès à la liste de vos réservations.',
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
