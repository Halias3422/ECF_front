import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Hero from '@/components/Hero/Hero';
import MainCTA from '@/components/MainCTA/MainCTA';
import Footer from '@/components/Sections/Footer/Footer';
import ReservationSection from '@/components/Sections/ReservationSection';
import Section from '@/components/Sections/Section';
import OptionalSignUpForm from '@/components/SignForms/OptionalSignUpForm';
import SignUpForm from '@/components/SignForms/SignUpForm';
import { DaySchedule } from '@/interfaces/schedule';
import { UserSignUpInfo } from '@/interfaces/users';
import { useState } from 'react';

const InscriptionPage = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  const [filledMandatoryInfo, setFilledMandatoryInfo] =
    useState<boolean>(false);
  const [signUpInfo, setSignUpInfo] = useState<UserSignUpInfo>({
    email: '',
    password: '',
    secondPassword: '',
  });

  return (
    <>
      <main>
        <Hero
          header={
            filledMandatoryInfo
              ? 'Bienvenue chez vous !'
              : 'Impatients de vous rencontrer !'
          }
          paragraphs={['']}
          image="toast-repas.jpg"
          imageAlt="Venez vivre des moments inoubliables"
          childComponents={[
            <SignUpForm
              signUpInfo={signUpInfo}
              setSignUpInfo={setSignUpInfo}
              filledMandatoryInfo={filledMandatoryInfo}
              setFilledMandatoryInfo={setFilledMandatoryInfo}
            />,
            <OptionalSignUpForm
              $mail={signUpInfo.email}
              filledMandatoryInfo={filledMandatoryInfo}
            />,
          ]}
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
          image="table-clients.jpg"
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
  const weekSchedule = scheduleResponse?.data;
  return {
    props: {
      weekSchedule,
    },
  };
};

export default InscriptionPage;
