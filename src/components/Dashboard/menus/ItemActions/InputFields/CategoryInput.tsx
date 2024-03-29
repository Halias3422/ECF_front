import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import UserContext from '@/context/UserContext';
import { CategoriesData } from '@/interfaces/categories';
import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const CategoryInput = ({
  attribute,
  item,
  changeItemAttribute,
  isModify,
}: {
  attribute: string;
  item: ModifyDashboardItem;
  changeItemAttribute: any;
  isModify: boolean;
}) => {
  const [categories, setCategories] = useState<CategoriesData[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    item.attributes[attribute]
  );
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
    const errorField = document.getElementById('categoryError');
    const response = await postProtectedDataToAPI(
      API_ROUTES.categories.createNewCategory,
      { name: newCategory },
      userContext.userSession
    );
    if (!response || response.status !== 201) {
      setError('Erreur: ' + response?.data);
      if (errorField) {
        errorField.style.display = 'block';
      }
    } else {
      setCreateCategory(false);
      setError('');
      await getAllCategories();
      if (errorField) {
        errorField.style.display = 'none';
      }
      setNewCategory('');
      (document.getElementById('categorySelect') as HTMLSelectElement).value =
        'default';
    }
  };

  const handleSelectedOption = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'newCategory') {
      setCreateCategory(true);
    } else {
      setSelectedCategory(e.target.value);
      setCreateCategory(false);
      changeItemAttribute(e, attribute);
    }
  };

  return (
    <>
      <select
        name="category"
        id="categorySelect"
        onChange={(e) => handleSelectedOption(e)}
        value={selectedCategory ? selectedCategory : 'default'}
      >
        <option id="optionLegend" disabled value="default">
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
            required={isModify ? false : true}
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
