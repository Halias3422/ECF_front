import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import BackgroundPopUp from './BackgroundPopUp';

interface CreateItemProp {
  context: any;
  attributes: any;
}
const CreateItemPopUp = ({
  createItem,
  setCreateItem,
}: {
  createItem: CreateItemProp;
  setCreateItem: Dispatch<SetStateAction<CreateItemProp>>;
}) => {
  const changeItemAttribute = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newValues = { ...createItem };
    if (key === 'image' && event.target.files) {
      const imageUrl = event.target.value.split('\\');
      const imageSrc = imageUrl[imageUrl.length - 1];
      newValues.attributes[key] = {
        file: event.target.files[0],
        name: imageSrc,
      };
    } else {
      newValues.attributes[key] = event.target.value;
    }
    setCreateItem(newValues);
  };
  useEffect(() => {
    if (Object.hasOwn(createItem.attributes, 'image')) {
      const form = document.getElementById('createForm');
      form?.getElementsByTagName('img')?.[0]?.remove();
      const input = document.getElementById('imageInput') as HTMLInputElement;
      if (input && input.files) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(input.files[0]);
        image.style.width = form?.offsetWidth + 'px';
        image.style.maxWidth = 'unset';
        image.style.marginTop = '15px';
        image.style.display = 'block';
        input.after(image);
      }
    }
  }, [createItem.attributes.image]);

  if (createItem.context.click) {
    return (
      <BackgroundPopUp id="createPopUpBackground">
        <label>Créer un nouvel Élément</label>
        <CreateForm
          id="createForm"
          onSubmit={(e) => e.preventDefault()}
          encType="multipart/form-data"
        >
          {Object.keys(createItem.attributes).map(
            (attribute: string, index: number) => {
              return (
                <Attribute key={index}>
                  <label htmlFor={attribute}>{attribute}:</label>
                  <input
                    type={
                      attribute === 'image'
                        ? 'file'
                        : attribute === 'number'
                        ? 'number'
                        : 'text'
                    }
                    name={
                      attribute === 'image' ? 'uploaded_image' : `${attribute}`
                    }
                    id={attribute + 'Input'}
                    required
                    onChange={(event) => changeItemAttribute(event, attribute)}
                  />
                </Attribute>
              );
            }
          )}
          <SubmitContainer>
            <Confirm
              type="submit"
              value="Confirmer"
              onClick={() =>
                setCreateItem({
                  ...createItem,
                  context: {
                    ...createItem.context,
                    confirm: true,
                  },
                })
              }
            />
            <Cancel
              type="submit"
              value="Annuler"
              onClick={() =>
                setCreateItem({
                  ...createItem,
                  context: {
                    title: '',
                    click: false,
                    confirm: false,
                  },
                })
              }
            />
          </SubmitContainer>
        </CreateForm>
      </BackgroundPopUp>
    );
  }
  return <></>;
};

const CreateForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  input#image {
    font-size: 18px;
  }
  label {
    font-size: 22px;
  }
`;

const Attribute = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitContainer = styled.div`
  display: flex;
  width: fit-content;
  gap: 20px;
  justify-content: space-between;
  input {
    font-size: 24px;
    padding: 5px 10px;
    width: 140px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
`;

const Confirm = styled.input`
  background-color: ${(props) => props.theme.lightGreen};
  color: ${(props) => props.theme.darkGrey};
`;

const Cancel = styled.input`
  background-color: darkRed;
  color: ${(props) => props.theme.snow};
`;

export default CreateItemPopUp;
