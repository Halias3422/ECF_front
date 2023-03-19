import { merriweatherSans } from '@/styles/fonts';
import Image from 'next/image';
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
    <section className={`section ${$isOdd ? 'odd' : 'even'}`}>
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
        <HeroImageContainer className="imageContainer">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_URL}/images/IMAGES_` + image}
            alt={imageAlt}
            title={imageAlt}
            fill
            loading="eager"
            className="image"
            sizes="(max-width: 1024px) 100vw,
										50vw"
          />
        </HeroImageContainer>
      </HeroContainer>
    </section>
  );
};

const HeroContainer = styled.article<{ $textIsLeft: boolean }>`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1025px) {
    flex-direction: ${(props) => (props.$textIsLeft ? 'row' : 'row-reverse')};
    justify-content: space-between;
    align-items: center;
    gap: 10%;
    min-height: 600px;
  }
`;

const TextContainer = styled.div`
  @media screen and (min-width: 1025px) {
    max-width: 45%;
  }
`;

const HeroImageContainer = styled.div`
  @media screen and (min-width: 1025px) {
    min-width: 55%;
    max-height: 800px;
    overflow: hidden;
  }
`;

export default Hero;
