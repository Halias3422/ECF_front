import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { roboto } from '@/styles/fonts';
import { useEffect } from 'react';
import styled from 'styled-components';

const TextAreaInput = ({
  attribute,
  item,
  changeItemAttribute,
  isModify,
}: {
  attribute: string;
  item: ModifyDashboardItem;
  changeItemAttribute: any;
  isModify: boolean;
}) => {
  const resizeTextArea = () => {
    const textArea = document.getElementById(
      attribute + 'Input'
    ) as HTMLTextAreaElement;
    if (textArea) {
      textArea.style.height = '0px';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  };
  useEffect(() => {
    resizeTextArea();
  }, []);

  return (
    <TextArea
      className={roboto.className}
      id={attribute + 'Input'}
      defaultValue={item.attributes[attribute]}
      onChange={(e) => changeItemAttribute(e, attribute)}
      onInput={resizeTextArea}
      required={isModify ? false : true}
    />
  );
};

const TextArea = styled.textarea`
  width: 80%;
  overflow: auto;
  font-size: 18px;
`;

export default TextAreaInput;
