import { useEffect } from 'react';
import styled from 'styled-components';

const BackgroundPopUp = (props: any) => {
  const { id, children } = props;

  useEffect(() => {
    const background = document.getElementById(id);
    if (background) {
      background.style.height = document.documentElement.scrollHeight + 'px';
    }
    const popUp = document.getElementById('itemPopUpContainer');
    if (popUp && popUp.offsetHeight > window.innerHeight * 0.8) {
      popUp.style.height = window.innerHeight * 0.8 + 'px';
      popUp.style.overflowY = 'scroll';
    }
  }, []);

  return (
    <Background id={id}>
      <PopUpContainer id="itemPopUpContainer">{children}</PopUpContainer>
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  backopacity: 0.7;
  z-index: 2;
`;

const PopUpContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.snow};
  padding: 50px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
export default BackgroundPopUp;
