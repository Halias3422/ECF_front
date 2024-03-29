import { merriweatherSans } from '@/styles/fonts';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Section = ({
  id,
  header,
  paragraphs,
  image,
  imageAlt,
  childComponents,
  $textIsLeft,
  $isOdd,
}: {
  id: string;
  header: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  childComponents?: JSX.Element[];
  $textIsLeft: boolean;
  $isOdd: boolean;
}) => {
  return (
    <section id={id} className={`section ${$isOdd ? 'odd' : 'even'}`}>
      <SectionContainer className="container" $textIsLeft={$textIsLeft}>
        <TextContainer>
          <h2 className={merriweatherSans.className}>{header}</h2>
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
        {image && (
          <div className="imageContainer">
            <Image
              loading="lazy"
              src={`${process.env.NEXT_PUBLIC_AWS_URL}/images/IMAGES_` + image}
              alt={imageAlt}
              title={imageAlt}
              className="image"
              fill
              sizes="(max-width: 1024px) 100vw,
										50vw"
            />
          </div>
        )}
      </SectionContainer>
    </section>
  );
};

const SectionContainer = styled.article<{ $textIsLeft: boolean }>`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1025px) {
    flex-direction: ${(props) => (props.$textIsLeft ? 'row' : 'row-reverse')};
    justify-content: space-between;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
  @media screen and (min-width: 1025px) {
    margin-bottom: 0px;
    max-width: 40%;
  }
`;

export default Section;
