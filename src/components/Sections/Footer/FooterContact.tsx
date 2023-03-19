import styled from 'styled-components';
import ContactInfoItem from './ContactInfoItem';

const FooterContact = () => {
  return (
    <FooterContactContainer>
      <h2>Nous contacter</h2>
      <ContactInfoItem
        label="Adresse"
        value="Le Quai Antique - 92 rue de la Régalade"
      />
      <ContactInfoItem label="Téléphone" value="01.02.03.04.05" />
      <ContactInfoItem label="E-mail" value="lequaiantique@gmail.com" />
      <ContactInfoItem label="Nous trouver" value="" />
      <OpenStreetMapFrame
        title="OpenStreetMap"
        src="//umap.openstreetmap.fr/en/map/untitled-map_875494?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false"
      ></OpenStreetMapFrame>
      <a href="//umap.openstreetmap.fr/en/map/untitled-map_875494">
        <u>Voir plein écran</u>
      </a>
    </FooterContactContainer>
  );
};

const FooterContactContainer = styled.article`
  border-top: ${(props) => `1px solid ${props.theme.snow}`};
  padding-top: 60px;
  @media screen and (min-width: 769px) {
    width: 80%;
  }
  @media screen and (min-width: 1025px) {
    width: 50%;
    border-top: none;
    padding-top: 0px;
    border-left: ${(props) => `1px solid ${props.theme.snow}`};
    padding-left: 5%;
  }
`;

const OpenStreetMapFrame = styled.iframe`
  margin-top: 30px;
  width: 100%;
  height: 50vw;
  max-height: 200px;
`;

export default FooterContact;
