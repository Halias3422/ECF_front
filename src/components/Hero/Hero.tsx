import { merriweatherSans } from '@/styles/fonts';
import React from 'react';
import styled from 'styled-components';

const Hero = ({
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
  childComponents?: JSX.Element[];
  $textIsLeft: boolean;
  $isOdd: boolean;
}) => {
  return (
    <article className={`section ${$isOdd ? 'odd' : 'even'}`}>
      <HeroContainer className="container" $textIsLeft={$textIsLeft}>
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
          {childComponents?.map((child, index) => {
            return <React.Fragment key={index}>{child}</React.Fragment>;
          })}
        </TextContainer>
        <img src={image} alt={imageAlt} title={imageAlt} />
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
  @media screen and (min-width: 1025px) {
    max-width: 40%;
  }
`;

export default Hero;
