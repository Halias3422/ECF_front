import Navbar from '@/components/Navbar/Navbar';
import UserContext from '@/context/UserContext';
import { UserLoginState } from '@/interfaces/users';
import colorscheme from '@/styles/colorscheme';
import { roboto } from '@/styles/fonts';
import GlobalStyle from '@/styles/GlobalStyle';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  const [userContext, setUserContext] = useState<UserLoginState>({
    id: '',
    token: '',
  });

  useEffect(() => {
    const localSession = localStorage.getItem('lqa_user_session');
    if (localSession) {
      const sessionItem = JSON.parse(localSession);
      if (sessionItem && sessionItem.token && sessionItem.id) {
      }
      setUserContext({
        id: sessionItem.id,
        token: sessionItem.token,
      });
    }
  }, []);

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
