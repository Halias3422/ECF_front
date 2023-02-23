import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';

const NavbarGreenLink = ({
  textContent,
  url,
}: {
  textContent: string;
  url: string;
}) => {
  return (
    <GreenLink className={merriweatherSans.className} href={url}>
      {textContent}
    </GreenLink>
  );
};

const GreenLink = styled.a`
  background-color: ${(props) => props.theme.lightGreen};
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 14px;
  min-width: fit-content;
`;

export default NavbarGreenLink;
