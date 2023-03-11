const ImageInput = ({
  attribute,
  changeItemAttribute,
}: {
  attribute: string;
  changeItemAttribute: any;
}) => {
  return (
    <input
      type="file"
      id="imageInput"
      onChange={(e) => changeItemAttribute(e, attribute)}
      required
    />
  );
};

export default ImageInput;
