import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

const PriceInput = ({
  attribute,
  item,
  changeItemAttribute,
}: {
  attribute: string;
  item: ModifyDashboardItem;
  changeItemAttribute: any;
}) => {
  const formatPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (item.attributes[attribute].length === 0) {
      item.attributes[attribute] = '10.99';
    }
    const newPrice = item.attributes[attribute].split('.');
    if (e.target.id === 'priceEuros') {
      newPrice[0] = e.target.value;
    } else if (e.target.id === 'priceCentimes') {
      newPrice[1] = e.target.value;
    }
    changeItemAttribute(
      { target: { value: newPrice[0] + '.' + newPrice[1] } },
      attribute
    );
  };

  return (
    <PriceContainer>
      <input
        type="number"
        id="priceEuros"
        min="0"
        defaultValue={item.attributes[attribute].split('.')[0] || '10'}
        onChange={(e) => formatPriceChange(e)}
        required
      />
      <label htmlFor="priceEuro">euros</label>
      <input
        type="number"
        id="priceCentimes"
        min="0"
        max="99"
        defaultValue={item.attributes[attribute].split('.')[1] || '99'}
        onChange={(e) => formatPriceChange(e)}
        required
      />
      <label htmlFor="priceCentimes">centimes</label>
    </PriceContainer>
  );
};

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2%;
  width: 80%;
`;

export default PriceInput;
