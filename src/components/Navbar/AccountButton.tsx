import { useState } from 'react';
import styled from 'styled-components';
import NavbarLink from './NavbarLink';

// Black Left-Pointing Small Triangle = &#9666 \u{25C2};
// Black Down-Pointing Small Triangle = &#9662;
// Space = &nbsp;

const AccountButton = ({
  textContent,
  theme,
  openedTheme,
}: {
  textContent: string;
  theme: string;
  openedTheme: string;
}) => {
  const [myAccountSubMenu, setMyAccountSubMenu] = useState<boolean>(false);
  const buttonValue: string =
    textContent + '\u{0020}' + (myAccountSubMenu ? '\u{25C2}' : '\u{25BE}');
  return (
    <div>
      <MyAccount
        type="button"
        id="myAccountButton"
        className={myAccountSubMenu ? openedTheme : theme}
        onClick={() => setMyAccountSubMenu(!myAccountSubMenu)}
        $myAccountSubMenu={myAccountSubMenu}
      >
        {buttonValue}
      </MyAccount>
      {myAccountSubMenu && (
        <SubMenuContainer className={openedTheme}>
          <NavbarLink
            textContent="Mes infos"
            url="/mon-compte"
            theme="themeLightBlue"
          />
          <MyAccount $myAccountSubMenu={false}>Déconnexion</MyAccount>
        </SubMenuContainer>
      )}
    </div>
  );
};

const MyAccount = styled.button<{ $myAccountSubMenu: boolean }>`
  position: relative;
  border: 0px;
  border-radius: 6px;
  ${(props) =>
    props.$myAccountSubMenu &&
    'border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;'}
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: fit-content;
  font-size: 16px;
  padding: 8px 15px;
  width: 150px;
  cursor: pointer;
`;

const SubMenuContainer = styled.div`
  padding: 10px 10%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  button {
    width: 135px;
  }
  @media screen and (min-width: 1025px) {
    position: absolute;
    width: 150px;
    padding: 10px 0px;
    button {
      width: 140px;
      font-size: 18px;
    }
  }
`;

export default AccountButton;
