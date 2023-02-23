import colorscheme from '@/styles/colorscheme';
import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';

const BasicHero = ({
  header,
  paragraphs,
  image,
  imageAlt,
  textIsLeft,
}: {
  header: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  textIsLeft: boolean;
}) => {
  return (
    <div className="section odd">
      <HeroContainer className="container">
        <TextContainer>
          <div
            className={merriweatherSans.className}
            dangerouslySetInnerHTML={{
              __html: `<h1>` + header + '</h1>',
            }}
          />
          {paragraphs.map((paragraph, index) => {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: '<p align="justify">' + paragraph + '<p>',
                }}
              />
            );
          })}
        </TextContainer>
        <HeroImage src={image} alt={imageAlt} />
      </HeroContainer>
    </div>
  );
};

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1025px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  margin-bottom: 20px;
  @media screen and (min-width: 1025px) {
    max-width: 35%;
  }
`;

const HeroImage = styled.img``;

export default BasicHero;
