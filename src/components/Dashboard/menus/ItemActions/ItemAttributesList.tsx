import { ModifyDashboardItem } from '@/interfaces/dashboard';
import axios from 'axios';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { resizePopUpHeight } from './BackgroundPopUp';
import HandleAttributeInputType from './InputFields/HandleAttributeInputType';

const ItemAttributesList = ({
  modifyItem,
  isModify,
}: {
  modifyItem: ModifyDashboardItem;
  isModify: boolean;
}) => {
  const changeItemAttribute = async (
    event: ChangeEvent<HTMLInputElement>,
    attribute: string
  ) => {
    resizePopUpHeight();
    if (attribute === 'image' && event.target.files) {
      (document.querySelector('.previewImage') as HTMLImageElement).src =
        URL.createObjectURL(event.target.files[0]);
      const imageUrl = event.target.value.split('\\');
      const imageName = imageUrl[imageUrl.length - 1];
      modifyItem.attributes[attribute] = {
        file: event.target.files[0],
        name: imageName,
      };
    } else {
      modifyItem.attributes[attribute] = event.target.value;
    }
  };

  return (
    <>
      {Object.keys(modifyItem.attributes).map(
        (attribute: string, index: number) => {
          if (attribute !== 'id') {
            return (
              <Attribute key={index} className="itemAttribute">
                <label htmlFor={attribute}>{attribute}:</label>
                <HandleAttributeInputType
                  attribute={attribute}
                  item={modifyItem}
                  changeItemAttribute={changeItemAttribute}
                  isModify={isModify}
                />
                {attribute === 'image' && (
                  <img
                    src={
                      modifyItem.hasOwnProperty('previousImage')
                        ? modifyItem.previousImage
                        : ''
                    }
                    className="previewImage"
                  />
                )}
              </Attribute>
            );
          }
        }
      )}
    </>
  );
};

const Attribute = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  input {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    margin-top: 20px;
    max-width: 60%;
  }
`;

export default ItemAttributesList;
