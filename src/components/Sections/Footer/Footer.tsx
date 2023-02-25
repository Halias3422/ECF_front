import { DaySchedule } from '@/interfaces/schedule';
import { useEffect } from 'react';
import styled from 'styled-components';
import FooterContact from './FooterContact';
import FooterSchedule from './FooterSchedule';

const Footer = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  const handleDividerHeight = () => {
    const divider = document.querySelector('#footerDivider');
    if (window.screen.width > 1025) {
      (divider as HTMLDivElement).style.height = '0px';
      (divider as HTMLDivElement).style.height =
        (document.querySelector('#footerContainer') as HTMLDivElement)
          .offsetHeight + 'px';
    } else {
      (divider as HTMLDivElement).style.height = '1px';
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleDividerHeight);
    handleDividerHeight();
  }, []);
  return (
    <footer className="section even">
      <FooterContainer id="footerContainer" className="container">
        <FooterSchedule weekSchedule={weekSchedule} />
        <FooterDivider id="footerDivider" />
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

const FooterDivider = styled.div`
  height: 1px;
  width: 100%;
  margin: 60px 0 60px 0;
  background-color: ${(props) => props.theme.snow};
  @media screen and (min-width: 1025px) {
    width: 1px;
    margin: 0px;
  }
`;

export default Footer;
