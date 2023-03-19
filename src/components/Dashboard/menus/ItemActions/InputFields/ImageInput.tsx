const ImageInput = ({
  attribute,
  changeItemAttribute,
  isModify,
}: {
  attribute: string;
  changeItemAttribute: any;
  isModify: boolean;
}) => {
  return (
    <input
      type="file"
      id="imageInput"
      onChange={(e) => changeItemAttribute(e, attribute)}
      required={isModify ? false : true}
    />
  );
};

export default ImageInput;
