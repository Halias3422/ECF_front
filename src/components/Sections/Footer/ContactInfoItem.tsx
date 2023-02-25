import styled from 'styled-components';

const ContactInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <ContactInfoItemContainer>
      <p>
        <b>{`${label}:`}</b>
      </p>
      <ContactInfoParaph>{value}</ContactInfoParaph>
    </ContactInfoItemContainer>
  );
};

const ContactInfoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20%;
  p {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 320px) {
    flex-direction: column;
  }
`;

const ContactInfoParaph = styled.p`
  text-align: end;
  white-space: pre-line;
  @media screen and (max-width: 320px) {
    text-align: start;
  }
`;

export default ContactInfoItem;
