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
    <Link
      role="button"
      className={`${merriweatherSans.className} ${theme}`}
      href={url}
    >
      {textContent}
    </Link>
  );
};

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: fit-content;
  font-size: ${(props) => (props.href === '/reserver' ? '16px' : '14px')};
  padding: ${(props) =>
    props.href === '/reserver' || props.href === '/mon-compte'
      ? '8px 15px'
      : '4px 8px'};
  min-width: 5rem;
  width: 120px;
  @media screen and (min-width: 1201px) {
    font-size: ${(props) => (props.href === '/reserver' ? '18px' : '16px')};
    padding: ${(props) =>
      props.href === '/reserver' ? '10px 20px' : '6px 10px'};
  }
`;

export default NavbarLink;
