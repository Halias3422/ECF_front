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
            "Notre équipe est prête à vous accueillir. Remplissez le formulaire et n'hésitez pas à renseigner vos demandes ou contraintes spécifiques. Nous nous occupons de tout, vous n'avez plus qu'à profiter.",
          ]}
          image="service-is-ready.jpg"
          imageAlt="Le restaurant est prêt à vous acceuillir !"
          $textIsLeft={false}
          $isOdd={true}
        />
        <ReservationForm $isOdd={false} weekSchedule={weekSchedule} />
        <Section
          id="howDoesItWorkSection"
          header="Comment ça marche ?"
          paragraphs={[
            "La demande de réservation est prise en compte une fois le formulaire complété envoyé. Vous n'avez rien d'autre à faire. Vous pouvez également effectuer votre réservation en nous contactant par téléphone au 01.02.03.04.05.",
            "Pour toute modification ou annulation concernant votre réservation, contactez-nous par téléphone. Nous vous prions de bien vouloir nous prévenir au moins 24h à l'avance afin de garantir le meilleur service.",
          ]}
          image="landline-phone.jpg"
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
