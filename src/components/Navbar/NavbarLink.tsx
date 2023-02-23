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
  font-size: ${(props) => (props.href === '/reserver' ? '18px' : '14px')};
  padding: 8px 10px;
  border-radius: 6px;
  width: 5rem;
  min-width: fit-content;
  @media screen and (min-width: 1201px) {
    font-size: ${(props) => (props.href === '/reserver' ? '22px' : '16px')};
    padding: 10px 12px;
  }
`;

export default NavbarLink;
