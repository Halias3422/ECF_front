import colorscheme from '@/styles/colorscheme';
import * as React from 'react';

const SvgAddDishGallery = () => (
  <svg
    width={96}
    height={96}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke={`${colorscheme.darkGrey}`}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 4H8.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 6.28 4 7.12 4 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C6.28 20 7.12 20 8.8 20h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C20 17.72 20 16.88 20 15.2V11" />
      <path d="m4 16 4.293-4.293a1 1 0 0 1 1.414 0L13 15m0 0 2.793-2.793a1 1 0 0 1 1.414 0L20 15m-7 0 2.25 2.25M18.5 3v2.5m0 2.5V5.5m0 0H16m2.5 0H21" />
    </g>
  </svg>
);

export default SvgAddDishGallery;
