import Navbar from '@/components/Navbar/Navbar';
import colorscheme from '@/styles/colorscheme';
import GlobalStyle from '@/styles/GlobalStyle';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={colorscheme}>
      <GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
