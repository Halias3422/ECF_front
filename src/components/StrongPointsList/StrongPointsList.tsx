import colorscheme from '@/styles/colorscheme';
import styled from 'styled-components';

const StrongPointsList = () => {
  return (
    <UnorderedList>
      <StrongPointItem>
        <BulletPoint />
        <PointContent>Lorem ipsum dolor sit amet</PointContent>
      </StrongPointItem>
      <StrongPointItem>
        <BulletPoint />
        <PointContent>Lorem ipsum dolor sit amet</PointContent>
      </StrongPointItem>
      <StrongPointItem>
        <BulletPoint />
        <PointContent>Lorem ipsum dolor sit amet</PointContent>
      </StrongPointItem>
    </UnorderedList>
  );
};

const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StrongPointItem = styled.div`
  display: flex;
  gap: 3vw;
  left: 0;
  margin-bottom: 42px;
  align-items: center;
`;

const PointContent = styled.li`
  margin: 0;
`;

const BulletPoint = styled.div`
  width: 18px;
  height: 18px;
  margin-top: 1px;
  border-radius: 50%;
  background-color: ${colorscheme.lightGreen};
`;

export default StrongPointsList;
