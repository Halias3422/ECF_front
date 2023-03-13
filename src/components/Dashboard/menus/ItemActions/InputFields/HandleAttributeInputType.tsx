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
}: {
  attribute: string;
  item: ModifyDashboardItem;
  changeItemAttribute: any;
}) => {
  switch (attribute) {
    case 'image':
      return (
        <ImageInput
          attribute={attribute}
          changeItemAttribute={changeItemAttribute}
        />
      );
    case 'description':
      return (
        <TextAreaInput
          attribute={attribute}
          item={item}
          changeItemAttribute={changeItemAttribute}
        />
      );
    case 'price':
      return (
        <PriceInput
          attribute={attribute}
          item={item}
          changeItemAttribute={changeItemAttribute}
        />
      );
    case 'category':
      return (
        <CategoryInput
          attribute={attribute}
          changeItemAttribute={changeItemAttribute}
        />
      );
    case 'formulas':
      return <FormulasInput attribute={attribute} item={item} />;
    default:
      return (
        <input
          type="text"
          id={attribute + 'Input'}
          defaultValue={item.attributes[attribute]}
          onChange={(e) => changeItemAttribute(e, attribute)}
          required
        />
      );
  }
};

export default HandleAttributeInputType;
