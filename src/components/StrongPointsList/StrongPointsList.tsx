import colorscheme from '@/styles/colorscheme';
import styled from 'styled-components';

const StrongPointsList = () => {
  return (
    <UnorderedList>
      <StrongPointItem>
        <BulletPoint />
        <PointContent>
          Une cuisine créative et authentique à base de produits locaux et
          frais. La Savoie est au coeur de nos assiettes.
        </PointContent>
      </StrongPointItem>
      <StrongPointItem>
        <BulletPoint />
        <PointContent>
          Une sélection des meilleurs vin de la région. Notre sommelier saura
          vous accompagner pour sublimer votre repas.
        </PointContent>
      </StrongPointItem>
      <StrongPointItem>
        <BulletPoint />
        <PointContent>
          Idéalement situés, nous vous offrons un cadre intime et chaleureux au
          sein d'un bâtiment historique. La nature en plein centre-ville.
        </PointContent>
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
  width: fit-content;
`;

const PointContent = styled.li`
  margin: 0;
`;

const BulletPoint = styled.div`
  width: 18px;
  height: 18px;
  display: block;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${colorscheme.lightGreen};
`;

export default StrongPointsList;
