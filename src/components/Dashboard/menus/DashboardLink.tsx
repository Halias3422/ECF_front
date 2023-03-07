import styled from 'styled-components';

const DashboardLink = ({
  title,
  url,
  svg,
}: {
  title: string;
  url: string;
  svg: JSX.Element;
}) => {
  return (
    <LinkContainer href={url} className="themeSnow dashboardMenuLinkOpening">
      <h3>{title}</h3>
      {svg}
    </LinkContainer>
  );
};

const LinkContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: ${(props) => `2px solid ${props.theme.darkGrey}`};
  border-radius: 12px;
  padding: 10px 5%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  h3 {
    text-align: center;
  }
`;

export default DashboardLink;
