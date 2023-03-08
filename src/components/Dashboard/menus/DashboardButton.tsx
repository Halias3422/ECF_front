import colorscheme from '@/styles/colorscheme';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import styled from 'styled-components';

const DashboardButton = ({
  title,
  svg,
  setOpenedConfigPanel,
}: {
  title: string;
  svg: JSX.Element;
  setOpenedConfigPanel: Dispatch<SetStateAction<string>>;
}) => {
  const handleButtonClick = () => {
    const allButtons = document.querySelectorAll('.subMenuButton');
    for (let i = 0; i < allButtons.length; i++) {
      const button = allButtons[i] as HTMLButtonElement;
      button.style.backgroundColor = `${colorscheme.snow}`;
      button.style.color = `${colorscheme.darkGrey}`;
      const svg = button.getElementsByTagName('svg')[0];
      svg.style.fill = `${colorscheme.darkGrey}`;
    }
    const currButton = document.getElementById(title) as HTMLButtonElement;
    currButton.style.backgroundColor = `${colorscheme.darkBlue}`;
    currButton.style.color = `${colorscheme.snow}`;
    setOpenedConfigPanel(title);
    const currSvg = currButton.getElementsByTagName('svg')[0];
    currSvg.style.fill = `${colorscheme.snow}`;
  };
  return (
    <ButtonContainer
      className="subMenuButton themeSnow dashboardMenuLinkOpening"
      id={title}
      onClick={() => handleButtonClick()}
    >
      <h3>{title}</h3>
      {svg}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  border: ${(props) => `2px solid ${props.theme.darkGrey}`};
  border-radius: 12px;
  padding: 10px 5%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  h3 {
    text-align: center;
  }
`;

export default DashboardButton;
