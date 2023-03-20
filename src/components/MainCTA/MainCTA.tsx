import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';

const MainCTA = ({
  textContent,
  url,
  theme,
}: {
  textContent: string;
  url: string;
  theme: string;
}) => {
  return (
    <div className="raiseOnHover">
      <CTA
        role="button"
        href={url}
        className={`${merriweatherSans.className} ${theme}`}
      >
        {textContent}
      </CTA>
    </div>
  );
};

const CTA = styled.a`
  display: flex;
  justify-content: center;
  font-size: 22px;
  width: calc(100% - 24px);
  max-width: 300px;
  padding: 4px 12px;
  font-weight: bold;

  @media screen and (min-width: 769px) {
    font-size: 24px;
  }

  @media screen and (min-width: 1025px) {
    font-size: 28px;
    padding: 6px 15px;
  }
`;

export default MainCTA;
