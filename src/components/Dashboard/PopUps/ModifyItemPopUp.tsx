import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';

interface ModifyItemProp {
  context: any;
  attributes: any;
}

const ModifyItemPopUp = ({
  modifyItem,
  setModifyItem,
}: {
  modifyItem: ModifyItemProp;
  setModifyItem: Dispatch<SetStateAction<ModifyItemProp>>;
}) => {
  useEffect(() => {
    const background = document.getElementById('modifyPopUpBackground');
    if (background) {
      background.style.top = window.scrollX.toString() + 'px';
      background.style.height =
        document.documentElement.scrollHeight.toString() + 'px';
    }
  }, [modifyItem.context.click]);

  if (modifyItem.context.click) {
    return (
      <Background id="modifyPopUpBackground">
        <PopUpContainer>
          <label>Modifier l'élément</label>
          modifyItem.attributes
        </PopUpContainer>
      </Background>
    );
  }
  return <></>;
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

export default ModifyItemPopUp;
