import styled from 'styled-components';

const BackgroundPopUp = (props: any) => {
  const { id, children } = props;
  return (
    <Background id={id}>
      <PopUpContainer>{children}</PopUpContainer>
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100vw;
  height: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  backopacity: 0.7;
`;

const PopUpContainer = styled.article`
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
  gap: 30px;
  text-align: center;
`;
export default BackgroundPopUp;
