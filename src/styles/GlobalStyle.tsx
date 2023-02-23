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

h1 {
	margin-bottom: 52px;
	font-size: 36px;
}

p {
	margin-bottom: 42px;
	font-size: 16px;
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
width: 100%;
padding-top: 50px;
padding-bottom: 50px;
}

.odd {
background-color: ${colorscheme.snow};
}

.even {
background-color: ${colorscheme.lightBlue};
}

.container {
width: 80%;
margin: 0 auto;
max-width: 1200px;
}

@media screen and (min-width: 481px) {

}

@media screen and (min-width: 769px) {
h1 {
font-size: 38px;
}
}

@media screen and (min-width: 1025px) {
h1 {
font-size: 42px;
}

p {
font-size: 18px;
}

img {
max-width: 55%;
}

.section {
padding-top: 80px;
padding-bottom: 80px;
}
}

@media screen and (min-width: 1201px) {

}
`;

export default GlobalStyle;
