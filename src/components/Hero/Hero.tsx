import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';

const Hero = ({
  header,
  paragraphs,
  image,
  imageAlt,
  $textIsLeft,
  $isOdd,
}: {
  header: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  $textIsLeft: boolean;
  $isOdd: boolean;
}) => {
  return (
    <article className={`section ${$isOdd ? 'odd' : 'even'}`}>
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
                  __html: '<p>' + paragraph + '<p>',
                }}
              />
            );
          })}
        </TextContainer>
        <img src={image} alt={imageAlt} title={imageAlt} />
      </HeroContainer>
    </article>
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
  @media screen and (min-width: 1025px) {
    max-width: 35%;
  }
`;

export default Hero;
