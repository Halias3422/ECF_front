import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const FormSubmitButtons = ({
  setConfirm,
  setCancel,
}: {
  setConfirm: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
}) => {
  const checkRequiredFields = () => {
    const form = document.getElementById('popUpForm') as HTMLFormElement;
    if (form) {
      const inputs = form.getElementsByTagName('input');
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].hasAttribute('required')) {
          if (inputs[i].value.length === 0) {
            return;
          }
        }
      }
    }
    setConfirm(true);
  };
  return (
    <SubmitContainer>
      <Confirm
        type="submit"
        value="Confirmer"
        onClick={() => checkRequiredFields()}
      />
      <Cancel type="button" value="Annuler" onClick={() => setCancel(true)} />
    </SubmitContainer>
  );
};

const SubmitContainer = styled.div`
  display: flex;
  width: fit-content;
  gap: 20px;
  justify-content: space-between;
  input {
    font-size: 24px;
    padding: 5px 10px;
    width: 140px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
`;

const Confirm = styled.input`
  background-color: ${(props) => props.theme.lightGreen};
  color: ${(props) => props.theme.darkGrey};
`;

const Cancel = styled.input`
  background-color: darkRed;
  color: ${(props) => props.theme.snow};
`;

export default FormSubmitButtons;
