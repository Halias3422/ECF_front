import styled from 'styled-components';
import MainCTA from '../MainCTA/MainCTA';

const ReservationSection = ({
  theme,
  $isOdd,
}: {
  theme: string;
  $isOdd: boolean;
}) => {
  return (
    <section
      id="reservationSection"
      className={`section ${$isOdd ? 'odd' : 'even'}`}
    >
      <ReservationSectionContainer className="container">
        <CenteredHeader>
          L'équipe du Quai Antique est prête à vous reçevoir pour vous faire
          vivre une expérience inoubliable et vous faire découvrir les trésors
          culinaires de la Savoie. Convaincu ? Alors n'hésitez plus !
        </CenteredHeader>
        <MainCTA textContent="Réservation" url="/reserver" theme={theme} />
      </ReservationSectionContainer>
    </section>
  );
};

const ReservationSectionContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredHeader = styled.h3`
  text-align: justify;
  margin-bottom: 60px;
  @media screen and (min-width: 769px) {
    text-align: center;
    margin-bottom: 80px;
  }
  @media screen and (min-width: 1025px) {
    margin-bottom: 110px;
    max-width: 70%;
  }
`;

export default ReservationSection;
