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
	margin-top: 0px;
	margin-bottom: 52px;
	font-size: 36px;
}

h2 {
	margin-top: 0px;
	margin-bottom: 38px;
font-size: 30px;
}

h3 {
	margin-top: 0px;
	margin-bottom: 32px;
font-size: 22px;
}

p, li {
	margin-bottom: 42px;
	font-size: 16px;
	text-align: justify
}

input, label {
	font-size: 18px;
}

label {
font-weight: bold;
}

img {
border-radius: 8px;
max-width: 100%;
max-height: 100%;
}

.themeLightGreen {
background-color: ${colorscheme.lightGreen};
color: ${colorscheme.darkGrey};
}

.themeDarkGreen {
background-color: ${colorscheme.darkGreen};
color: ${colorscheme.snow}
}

.themeDarkGrey {
background-color: ${colorscheme.darkGrey};
color: ${colorscheme.snow}
}

.themeDarkBlue {
background-color: ${colorscheme.darkBlue};
color: ${colorscheme.snow};
}

.section {
width: 100%;
padding-top: 70px;
padding-bottom: 70px;
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
h3 {
font-size: 24px;
}

.section {
padding-top: 90px;
padding-bottom: 90px;
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
max-width: 55%;
max-height: 800px;
}

.section {
padding-top: 110px;
padding-bottom: 110px;
}
}

@media screen and (min-width: 1201px) {
h1 {
font-size: 46px;
}
h2 {
font-size: 38px;
}
.section {
padding-top: 100px;
padding-bottom: 100px;
}

p, li {
font-size: 18px;
}

label, input {
font-size: 22px;
}

}
`;

export default GlobalStyle;
