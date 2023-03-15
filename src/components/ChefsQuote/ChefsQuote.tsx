import { dancingScript } from '@/styles/fonts';
import styled from 'styled-components';

const ChefsQuote = ({ quote }: { quote: string }) => {
  return (
    <ChefsQuoteContainer className="themeDarkGreen">
      <ChefsQuoteBlock>
        <p>
          <i>"{quote}"</i>
        </p>
      </ChefsQuoteBlock>
      <figcaption className={dancingScript.className}>
        - Chef Arnaud Michant
      </figcaption>
    </ChefsQuoteContainer>
  );
};

const ChefsQuoteContainer = styled.div`
  padding: 20px 40px;
  border-radius: 8px;
  figcaption {
    text-align: right;
    font-size: 22px;
    font-weight: bold;
  }
  margin-bottom: 40px;
  @media screen and (min-width: 1025px) {
    margin-bottom: 0px;
    figcaption {
      font-size: 26px;
    }
  }
`;

const ChefsQuoteBlock = styled.blockquote`
  margin: 0px;
`;

export default ChefsQuote;
