import { useEffect } from 'react';
import styled from 'styled-components';
import FooterContact from './FooterContact';
import FooterSchedule from './FooterSchedule';

const Footer = () => {
  const handleDividerHeight = () => {
    if (window.screen.width > 1025) {
      (
        document.querySelector('#footerDivider') as HTMLDivElement
      ).style.height = '0px';
      (
        document.querySelector('#footerDivider') as HTMLDivElement
      ).style.height =
        (document.querySelector('#footerContainer') as HTMLDivElement)
          .offsetHeight + 'px';
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleDividerHeight);
    handleDividerHeight();
  }, []);
  return (
    <footer className="section even">
      <FooterContainer id="footerContainer" className="container">
        <FooterSchedule />
        <FooterDivider id="footerDivider" />
        <FooterContact />
      </FooterContainer>
    </footer>
  );
};

const FooterContainer = styled.div`
  @media screen and (min-width: 1025px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.snow};
  @media screen and (min-width: 1025px) {
    width: 1px;
  }
`;

export default Footer;
