import { createGlobalStyle } from 'styled-components';
import colorscheme from './colorscheme';

const GlobalStyle = createGlobalStyle`
html,
body,
div#__next {
	margin: 0;
	height: 100%;
	color: ${colorscheme.darkGrey};
}

a {
	text-decoration: none;
	color: ${colorscheme.darkGrey}
}

.section {
	padding: 0.75rem 10%;
}

@media screen and (min-width: 1025px) {
.container {
	max-width: 1400px;
margin: auto;
}
}
`;

export default GlobalStyle;
