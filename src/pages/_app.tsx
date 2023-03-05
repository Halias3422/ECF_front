import Navbar from '@/components/Navbar/Navbar';
import UserContext from '@/context/UserContext';
import { UserLoginState } from '@/interfaces/users';
import colorscheme from '@/styles/colorscheme';
import { roboto } from '@/styles/fonts';
import GlobalStyle from '@/styles/GlobalStyle';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  const [userContext, setUserContext] = useState<UserLoginState>({
    isLoggedIn: false,
    token: '',
  });
  return (
    <ThemeProvider theme={colorscheme}>
      <GlobalStyle />
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <div className={roboto.className}>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </UserContext.Provider>
    </ThemeProvider>
  );
}
