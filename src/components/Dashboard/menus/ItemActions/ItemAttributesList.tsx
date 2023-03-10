import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

const ItemAttributesList = ({
  modifyItem,
}: {
  modifyItem: ModifyDashboardItem;
}) => {
  const changeItemAttribute = (
    event: ChangeEvent<HTMLInputElement>,
    attribute: string
  ) => {
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
          const type =
            attribute === 'image'
              ? 'file'
              : attribute === 'number'
              ? 'number'
              : 'text';
          if (attribute !== 'id') {
            return (
              <Attribute key={index} className="itemAttribute">
                <label htmlFor={attribute}>{attribute}:</label>
                <input
                  type={type}
                  id={attribute + 'Input'}
                  defaultValue={
                    type === 'file' ? '' : modifyItem.attributes[attribute]
                  }
                  onChange={(e) => changeItemAttribute(e, attribute)}
                  required={type === 'file' ? false : true}
                />
                {attribute === 'image' && (
                  <img
                    src={
                      modifyItem.hasOwnProperty('previousImage')
                        ? modifyItem.attributes.image.name
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
    text-align: center;
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
