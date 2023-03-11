import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import UserContext from '@/context/UserContext';
import { CategoryData } from '@/interfaces/categories';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const CategoryInput = ({
  attribute,
  changeItemAttribute,
}: {
  attribute: string;
  changeItemAttribute: any;
}) => {
  const [categories, setCategories] = useState<CategoryData[]>();
  const [createCategory, setCreateCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { userContext } = useContext(UserContext);

  const getAllCategories = async () => {
    const categories = await getDataFromAPI(
      API_ROUTES.categories.getAllCategories
    );
    setCategories(categories.data);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCreateNewCategory = async () => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.categories.createNewCategory,
      { name: newCategory },
      userContext.userSession
    );
    if (!response || response.status !== 200) {
      setError('Erreur: ' + response?.data);
      const errorField = document.getElementById('categoryError');
      if (errorField) {
        errorField.style.display = 'block';
      }
    } else {
      setCreateCategory(false);
      setError('');
      await getAllCategories();
      const errorField = document.getElementById('categoryError');
      if (errorField) {
        errorField.style.display = 'none';
      }
      setNewCategory('');
    }
  };

  const handleSelectedOption = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'newCategory') {
      setCreateCategory(true);
    } else {
      changeItemAttribute(e, attribute);
    }
  };

  return (
    <>
      <select
        name="category"
        id="categorySelect"
        onChange={(e) => handleSelectedOption(e)}
        defaultValue=""
      >
        <option id="optionLegend" disabled value="">
          -- Choisir une catégorie --
        </option>
        {categories?.map((category) => {
          return (
            <option
              key={category.name}
              value={category.name}
              id={category.name + 'Option'}
            >
              {category.name}
            </option>
          );
        })}
        <option value="newCategory">Créer nouvelle catégorie</option>
      </select>
      {createCategory && (
        <NewCategoryContainer>
          <input
            type="text"
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
          <input
            type="button"
            value="Confirmer"
            onClick={() => handleCreateNewCategory()}
          />
          <Error id="categoryError">{error}</Error>
        </NewCategoryContainer>
      )}
    </>
  );
};

const NewCategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 15px;
  input {
    width: fit-content;
  }
`;

const Error = styled.p`
  display: none;
  margin-bottom: -20px;
  color: darkRed;
  max-width: 400px;
  overflow-wrap: anywhere;
`;

export default CategoryInput;
