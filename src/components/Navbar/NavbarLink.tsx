import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';

const NavbarLink = ({
  textContent,
  url,
  className,
}: {
  textContent: string;
  url: string;
  className: string;
}) => {
  return (
    <Link className={`${merriweatherSans.className} ${className}`} href={url}>
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
  padding: ${(props) => (props.href === '/reserver' ? '8px 15px' : '4px 8px')};
  border-radius: 6px;
  width: 5rem;
  min-width: fit-content;
  @media screen and (min-width: 1201px) {
    font-size: ${(props) => (props.href === '/reserver' ? '18px' : '16px')};
    padding: ${(props) =>
      props.href === '/reserver' ? '10px 20px' : '6px 10px'};
  }
`;

export default NavbarLink;
