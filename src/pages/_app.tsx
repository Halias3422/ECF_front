import Favicon from '@/components/Favicon/Favicon';
import Navbar from '@/components/Navbar/Navbar';
import UserContext from '@/context/UserContext';
import { UserLoginState } from '@/interfaces/users';
import colorscheme from '@/styles/colorscheme';
import { roboto } from '@/styles/fonts';
import GlobalStyle from '@/styles/GlobalStyle';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  const [userContext, setUserContext] = useState<UserLoginState>({
    contextLoaded: false,
    loggedIn: false,
    userSession: '',
  });

  useEffect(() => {
    const localSession = localStorage.getItem('lqa_user_session');
    if (localSession) {
      setUserContext({
        contextLoaded: true,
        loggedIn: true,
        userSession: localSession,
      });
    } else {
      setUserContext({
        ...userContext,
        contextLoaded: true,
      });
    }
  }, []);

  return (
    <ThemeProvider theme={colorscheme}>
      <Head>
        <Favicon />
      </Head>
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
