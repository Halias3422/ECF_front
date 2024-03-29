import colorscheme from '@/styles/colorscheme';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const HamburgerMenu = ({
  hamburgerOpen,
  setHamburgerOpen,
}: {
  hamburgerOpen: boolean;
  setHamburgerOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <IconContainer
    type="button"
    id="hamburgerMenu"
    name="hamburgerMenu"
    aria-label="openMenu"
  >
    <svg
      id="hamburgerMenuIcon"
      onClick={() => setHamburgerOpen(!hamburgerOpen)}
      width="48px"
      height="48px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="hamburgerPath"
        d="M4 17h16M4 12h16M4 7h16"
        stroke={colorscheme.lightGreen}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconContainer>
);

//hide icon for larger displays
const IconContainer = styled.button`
  border: none;
  background-color: ${(props) => props.theme.darkGreen};
  cursor: pointer;
  @media screen and (min-width: 1025px) {
    display: none;
  }
`;

export default HamburgerMenu;
