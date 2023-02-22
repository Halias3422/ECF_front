import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,
body,
div#__next {
	margin: 0;
	height: 100%;
}

a {
	text-decoration: none;
}
`;

export default GlobalStyle;
