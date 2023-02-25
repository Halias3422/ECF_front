import colorscheme from '@/styles/colorscheme';
import styled from 'styled-components';
import ContactInfoItem from './ContactInfoItem';

const FooterContact = () => {
  return (
    <div>
      <h2>Nous contacter</h2>
      <ContactInfoItem
        label="Adresse"
        value="Le Quai Antique - 92 rue de la Régalade"
      />
      <ContactInfoItem label="Téléphone" value="01.02.03.04.05" />
      <ContactInfoItem label="E-mail" value="lequaiantique@gmail.com" />
      <ContactInfoItem label="Nous trouver" value="" />
      {/*using object because iframe would not take zoom level into account */}
      <OpenStreetMapFrame src="//umap.openstreetmap.fr/en/map/untitled-map_875494?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false"></OpenStreetMapFrame>
      <a href="//umap.openstreetmap.fr/en/map/untitled-map_875494">
        <u>Voir plein écran</u>
      </a>
    </div>
  );
};

const OpenStreetMapFrame = styled.iframe`
  margin-top: 30px;
  width: 100%;
  height: 50vw;
  max-height: 300px;
`;

export default FooterContact;
