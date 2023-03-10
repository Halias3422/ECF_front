import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { roboto } from '@/styles/fonts';
import styled from 'styled-components';

const HandleAttributeInputType = ({
  attribute,
  item,
  changeItemAttribute,
}: {
  attribute: string;
  item: ModifyDashboardItem;
  changeItemAttribute: any;
}) => {
  switch (attribute) {
    case 'image':
      return (
        <input
          type="file"
          id={'imageInput'}
          onChange={(e) => changeItemAttribute(e, attribute)}
        />
      );
    case 'description':
      return (
        <TextArea
          className={roboto.className}
          id={attribute + 'Input'}
          defaultValue={item.attributes[attribute]}
          required
        />
      );
    case 'price':
      return (
        <PriceContainer>
          <input
            type="number"
            id="priceEuro"
            min="0"
            defaultValue={item.attributes[attribute].split('.')[0]}
            required
          />
          <label htmlFor="priceEuro">euros</label>
          <input
            type="number"
            id="priceCentimes"
            min="0"
            max="99"
            defaultValue={item.attributes[attribute].split('.')[1]}
            required
          />
          <label htmlFor="priceCentimes">centimes</label>
        </PriceContainer>
      );
    default:
      return (
        <input
          type="text"
          id={attribute + 'Input'}
          defaultValue={item.attributes[attribute]}
          required
        />
      );
  }
};

const TextArea = styled.textarea`
  width: 80%;
  min-height: fit-content;
  font-size: 18px;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2%;
  width: 80%;
`;

export default HandleAttributeInputType;
