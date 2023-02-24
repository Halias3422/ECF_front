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
	color: ${colorscheme.darkGrey};
	border-radius: 6px;
}

h1 {
	margin-bottom: 52px;
	font-size: 36px;
}

h2 {
	margin-bottom: 38px;
font-size: 30px;
}

p, li {
	margin-bottom: 42px;
	font-size: 16px;
}

img {
border-radius: 8px;
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
color: ${colorscheme.snow}
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
h2 {
font-size: 32px;
}
}

@media screen and (min-width: 1025px) {
h1 {
font-size: 42px;
}
h2 {
font-size: 36px;
}


img {
max-width: 40%;
}

.section {
padding-top: 80px;
padding-bottom: 80px;
}
}

@media screen and (min-width: 1201px) {
.section {
padding-top: 100px;
padding-bottom: 100px;
}

p, li {
font-size: 18px;
}
img {
max-width: 55%;
}

}
`;

export default GlobalStyle;
