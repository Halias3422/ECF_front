import { DishFormData } from '@/interfaces/dishes';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';

const CreateNewDishForm = () => {
  const [dishFormData, setDishFormData] = useState<DishFormData | null>(null);
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <NewDishForm onSubmit={handleFormSubmit}>
      <label htmlFor="dishTitle">Titre</label>
      <input
        type="text"
        id="dishTitle"
        name="dishTitle"
        maxLength={255}
        onChange={(event) =>
          setDishFormData((dishFormData) => ({
            ...dishFormData,
            title: event.target.value,
          }))
        }
        required
      />
      <label htmlFor="dishDescription">Description</label>
      <input
        type="text"
        id="dishDescription"
        name="dishDescription"
        maxLength={1000}
        onChange={(event) =>
          setDishFormData((dishFormData) => ({
            ...dishFormData,
            description: event.target.value,
          }))
        }
        required
      />
      <label htmlFor="dishPrice">Prix</label>
      <input
        type="number"
        id="dishPrice"
        name="dishPrice"
        min="0"
        onChange={(event) =>
          setDishFormData((dishFormData) => ({
            ...dishFormData,
            // + allows to cast to a float
            price: +event.target.value,
          }))
        }
        required
      />
      <label htmlFor="dishCategory">Catégorie</label>
      <input
        type="text"
        id="dishCategory"
        name="dishCategory"
        maxLength={255}
        onChange={(event) =>
          setDishFormData((dishFormData) => ({
            ...dishFormData,
            category: event.target.value,
          }))
        }
        required
      />
      <input type="submit" value="submit" />
    </NewDishForm>
  );
};

const NewDishForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default CreateNewDishForm;
