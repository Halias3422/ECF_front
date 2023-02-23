import { merriweatherSans } from '@/styles/fonts';
import React from 'react';
import styled from 'styled-components';

const Section = ({
  header,
  paragraphs,
  image,
  imageAlt,
  childComponents,
  $textIsLeft,
  $isOdd,
}: {
  header: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  childComponents: JSX.Element[];
  $textIsLeft: boolean;
  $isOdd: boolean;
}) => {
  return (
    <article className={`section ${$isOdd ? 'odd' : 'even'}`}>
      <HeroContainer className="container" $textIsLeft={$textIsLeft}>
        <TextContainer>
          <h2 className={merriweatherSans.className}>{header}</h2>
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
          {childComponents.map((child, index) => {
            return <React.Fragment key={index}>{child}</React.Fragment>;
          })}
        </TextContainer>
        {image && <Image src={image} alt={imageAlt} />}
      </HeroContainer>
    </article>
  );
};

const HeroContainer = styled.div<{ $textIsLeft: boolean }>`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1025px) {
    flex-direction: ${(props) => (props.$textIsLeft ? 'row' : 'row-reverse')};
    justify-content: space-between;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  margin-bottom: 20px;
  @media screen and (min-width: 1025px) {
    max-width: 45%;
  }
  @media screen and (min-width: 1201px) {
    max-width: 40%;
  }
`;

const Image = styled.img``;

export default Section;
