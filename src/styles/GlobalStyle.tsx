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

.themeLightGreen {
background-color: ${colorscheme.lightGreen};
}

.themeDarkGreen {
background-color: ${colorscheme.darkGreen};
color: ${colorscheme.snow}
}

.themeDarkGrey {
background-color: ${colorscheme.darkGrey};
color: ${colorscheme.snow}
}

.section {
	padding: 0.75rem;
width: 100%;
}

.container {
width: 80%;
margin: 0 auto;
}

@media screen and (min-width: 1025px) {
.container {
	max-width: 1400px;
}
}
`;

export default GlobalStyle;
