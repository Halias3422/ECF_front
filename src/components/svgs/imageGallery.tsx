import colorscheme from '@/styles/colorscheme';
import * as React from 'react';

const SvgImageGallery = () => (
  <svg
    viewBox="0 0 20 20"
    fill={`${colorscheme.darkGrey}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0 0h20v20H0z" />
    <path d="M5 3h14v11h-2v2h-2v2H1V7h2V5h2V3zm13 10V4H6v9h12zm-3-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1 6v-1H5V6H4v9h12zM7 6l10 6H7V6zm7 11v-1H3V8H2v9h12z" />
  </svg>
);

export default SvgImageGallery;
