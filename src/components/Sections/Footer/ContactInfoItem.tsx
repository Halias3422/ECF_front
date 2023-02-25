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
      <ContactInfoLabel>
        <b>{`${label}:`}</b>
      </ContactInfoLabel>
      <ContactInfoParaph>{value}</ContactInfoParaph>
    </ContactInfoItemContainer>
  );
};

const ContactInfoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20%;
  @media screen and (max-width: 320px) {
    flex-direction: column;
  }
`;

const ContactInfoLabel = styled.p`
  margin: 0;
`;

const ContactInfoParaph = styled.small`
  text-align: end;
  white-space: pre-line;
  margin-bottom: 25px;
  font-size: 14px;
  @media screen and (max-width: 320px) {
    text-align: start;
  }
  @media screen and (min-width: 1025px) {
    font-size: 16px;
  }
`;

export default ContactInfoItem;
