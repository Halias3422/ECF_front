import styled from 'styled-components';
import MainCTA from '../MainCTA/MainCTA';
import Section from '../Section/Section';

const ReservationSection = ({
  theme,
  $isOdd,
}: {
  theme: string;
  $isOdd: boolean;
}) => {
  return (
    <article
      id="reservationSection"
      className={`section ${$isOdd ? 'odd' : 'even'}`}
    >
      <ReservationSectionContainer className="container">
        <CenteredHeader>
          consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit.
          consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit.
        </CenteredHeader>
        <MainCTA textContent="Réservation" url="/reserver" theme={theme} />
      </ReservationSectionContainer>
    </article>
  );
};

const ReservationSectionContainer = styled.div`
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
