import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';

const NavbarLink = ({
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
      <Link
        role="button"
        className={`${merriweatherSans.className} ${theme}`}
        href={url}
      >
        {textContent}
      </Link>
    </div>
  );
};

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: fit-content;
  font-size: ${(props) => (props.href === '/reserver' ? '18px' : '16px')};
    padding: ${(props) =>
      props.href === '/reserver' ? '10px 20px' : '6px 10px'};
  }
  min-width: fit-content;
  width: 6vw;
  @media screen and (min-width: 1201px) {
`;

export default NavbarLink;
