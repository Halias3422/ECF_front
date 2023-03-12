import { ModifyDashboardItem } from '@/interfaces/dashboard';
import styled from 'styled-components';

const PriceInput = ({
  attribute,
  item,
}: {
  attribute: string;
  item: ModifyDashboardItem;
}) => {
  const formatPriceChange = () => {
    const priceEuros = document.getElementById(
      'priceEuros'
    ) as HTMLInputElement;
    const priceCentimes = document.getElementById(
      'priceCentimes'
    ) as HTMLInputElement;
    item.attributes[attribute] = priceEuros.value + '.' + priceCentimes.value;
  };

  return (
    <PriceContainer>
      <input
        type="number"
        id="priceEuros"
        min="0"
        defaultValue={item.attributes[attribute].split('.')[0]}
        onChange={() => formatPriceChange()}
        required
      />
      <label htmlFor="priceEuro">euros</label>
      <input
        type="number"
        id="priceCentimes"
        min="0"
        max="99"
        defaultValue={item.attributes[attribute].split('.')[1] || '99'}
        onChange={() => formatPriceChange()}
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
