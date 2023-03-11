import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { roboto } from '@/styles/fonts';
import styled from 'styled-components';

const TextAreaInput = ({
  attribute,
  item,
  changeItemAttribute,
}: {
  attribute: string;
  item: ModifyDashboardItem;
  changeItemAttribute: any;
}) => {
  return (
    <TextArea
      className={roboto.className}
      id={attribute + 'Input'}
      defaultValue={item.attributes[attribute]}
      onChange={(e) => changeItemAttribute(e, attribute)}
      required
    />
  );
};

const TextArea = styled.textarea`
  width: 80%;
  min-height: fit-content;
  font-size: 18px;
`;

export default TextAreaInput;
