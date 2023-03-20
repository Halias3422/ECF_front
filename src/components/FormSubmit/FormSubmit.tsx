import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';

const FormSubmit = ({
  textContent,
  theme,
}: {
  textContent: string;
  theme: string;
}) => {
  return (
    <div className="raiseOnHover">
      <Submit
        type="submit"
        className={`${merriweatherSans.className} ${theme}`}
        value={textContent}
      />
    </div>
  );
};

const Submit = styled.input`
  border: none;
  display: flex;
  justify-content: center;
  font-size: 22px;
  width: 100%;
  max-width: 324px;
  padding: 4px 15px;
  font-weight: bold;
	border-radius 6px;
	cursor: pointer;

  @media screen and (min-width: 769px) {
    font-size: 24px;
  }

  @media screen and (min-width: 1025px) {
    font-size: 28px;
    padding: 6px 15px;
  }
`;

export default FormSubmit;
