import { DaySchedule } from '@/interfaces/schedule';
import { useEffect } from 'react';
import styled from 'styled-components';
import FooterContact from './FooterContact';
import FooterSchedule from './FooterSchedule';

const Footer = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  return (
    <footer className="section even">
      <FooterContainer id="footerContainer" className="container">
        <FooterSchedule weekSchedule={weekSchedule} />
        <FooterContact />
      </FooterContainer>
    </footer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 769px) {
    align-items: center;
  }
  @media screen and (min-width: 1025px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export default Footer;
