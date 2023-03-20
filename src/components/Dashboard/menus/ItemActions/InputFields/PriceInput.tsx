import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';

const PriceInput = ({
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
  const formatPriceChange = (e?: ChangeEvent<HTMLInputElement>) => {
    if (item.attributes[attribute].length === 0 || !e) {
      item.attributes[attribute] = '10.99';
      changeItemAttribute({ target: { value: '10.99' } }, attribute);
      return;
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

  useEffect(() => {
    formatPriceChange();
  }, []);

  return (
    <PriceContainer>
      <input
        type="number"
        id="priceEuros"
        min="0"
        defaultValue={item.attributes[attribute].split('.')[0] || '10'}
        onChange={(e) => formatPriceChange(e)}
        required={isModify ? false : true}
      />
      <label htmlFor="priceEuro">euros</label>
      <input
        type="number"
        id="priceCentimes"
        min="0"
        max="99"
        defaultValue={item.attributes[attribute].split('.')[1] || '99'}
        onChange={(e) => formatPriceChange(e)}
        required={isModify ? false : true}
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
