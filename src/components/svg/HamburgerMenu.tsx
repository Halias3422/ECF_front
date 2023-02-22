import colorscheme from '@/styles/colorscheme';
import * as React from 'react';

const HamburgerMenu = (props: any) => (
  <svg
    width="2.25rem"
    height="2.25rem"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 17h16M4 12h16M4 7h16"
      stroke={colorscheme.lightGreen}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HamburgerMenu;
