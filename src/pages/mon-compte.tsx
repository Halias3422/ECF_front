import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, getProtectedDataFromAPI } from '@/api/utils';
import Footer from '@/components/Sections/Footer/Footer';
import UserInfoDashboard from '@/components/UserInfoDashboard/UserInfoDashboard';
import UserContext from '@/context/UserContext';
import { DaySchedule } from '@/interfaces/schedule';
import { UserOptionalInfo } from '@/interfaces/users';
import { merriweatherSans } from '@/styles/fonts';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const MonComptePage = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  const { userContext } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState<UserOptionalInfo>();

  // TODO add reservations view + cancel
  // TODO add password change

  const getUserInfo = async () => {
    const response = await getProtectedDataFromAPI(
      API_ROUTES.users.getOptionalInfo,
      userContext.userSession
    );
    if (!response || response.status !== 200) {
      window.location.href = '/connexion';
    } else {
      setUserInfo(response.data.data);
    }
  };

  useEffect(() => {
    if (userContext.contextLoaded) {
      if (!userContext.userSession) {
        window.location.href = '/connexion';
      }
      getUserInfo();
    }
  }, [userContext.contextLoaded]);

  if (userContext.contextLoaded) {
    return (
      <>
        <main>
          <section className="section odd">
            <AccountInfoContainer className="container">
              <h1 className={merriweatherSans.className}>Mon Compte</h1>
              <UserInfoDashboard
                userInfo={userInfo}
                userContext={userContext}
              />
              {/*<AccountInfoForm>
								<label htmlFor="defaultGuestNumber">
                  Nombre de couverts par défaut:
                </label>
                <input
                  type="number"
                  id="defaultGuestNumber"
                  name="defaultGuestNumber"
                  defaultValue={userInfo.defaultGuestNumber}
                  min="1"
                  max="45"
                />
                <label htmlFor="defaultAllergies">
                  Allergies ou autres demandes:
                </label>
                <DefaultAllergies
                  className={roboto.className}
                  id="defaultAllergies"
                  name="defaultAllergies"
                  defaultValue={userInfo.defaultAllergies}
                />
              </AccountInfoForm>
              <FormSubmit textContent="Modifier" theme="themeDarkGreen" />*/}
            </AccountInfoContainer>
          </section>
        </main>
        <Footer weekSchedule={weekSchedule} />
      </>
    );
  } else {
  }
  return <p>Loading...</p>;
};

const AccountInfoContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AccountInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  input,
  textarea {
    margin-top: 10px;
    margin-bottom: 40px;
  }
  input {
    max-width: 100%;
  }
`;

const DefaultAllergies = styled.textarea`
  height: 200px;
  min-height: fit-content;
  width: 100%;
  @media screen and (min-width: 769px) {
    width: 80%;
  }
`;

export const getStaticProps = async () => {
  const scheduleResponse = await getDataFromAPI(
    API_ROUTES.schedule.getWeekSchedule
  );
  const weekSchedule = scheduleResponse?.data;
  return {
    props: {
      weekSchedule,
    },
  };
};

export default MonComptePage;
