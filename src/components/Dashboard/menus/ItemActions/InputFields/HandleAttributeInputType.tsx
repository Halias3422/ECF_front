import { ModifyDashboardItem } from '@/interfaces/dashboard';
import CategoryInput from './CategoryInput';
import FormulasInput from './FormulasInput';
import ImageInput from './ImageInput';
import PriceInput from './PriceInput';
import TextAreaInput from './TextAreaInput';

const HandleAttributeInputType = ({
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
  switch (attribute) {
    case 'image':
      return (
        <ImageInput
          attribute={attribute}
          changeItemAttribute={changeItemAttribute}
          isModify={isModify}
        />
      );
    case 'description':
      return (
        <TextAreaInput
          attribute={attribute}
          item={item}
          changeItemAttribute={changeItemAttribute}
          isModify={isModify}
        />
      );
    case 'price':
      return (
        <PriceInput
          attribute={attribute}
          item={item}
          changeItemAttribute={changeItemAttribute}
          isModify={isModify}
        />
      );
    case 'category':
      return (
        <CategoryInput
          attribute={attribute}
          changeItemAttribute={changeItemAttribute}
          isModify={isModify}
        />
      );
    case 'formulas':
      return (
        <FormulasInput attribute={attribute} item={item} isModify={isModify} />
      );
    default:
      return (
        <input
          type="text"
          id={attribute + 'Input'}
          defaultValue={item.attributes[attribute]}
          onChange={(e) => changeItemAttribute(e, attribute)}
          required={isModify ? false : true}
        />
      );
  }
};

export default HandleAttributeInputType;
