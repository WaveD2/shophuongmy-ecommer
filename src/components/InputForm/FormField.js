import { WrapperInputStyle, LabelInput } from "./style";

const FormField = ({ field, form, ...props }) => {
  return (
    <div>
      <LabelInput>{field.name}</LabelInput>
      <WrapperInputStyle {...field} {...props} />
      <p className="text-error">
        {form?.errors[`${field.name}`] && form?.touched[`${field.name}`] ? (
          <div>{form?.errors[`${field.name}`].slice(0, 30)}</div>
        ) : null}
      </p>
    </div>
  );
};

export default FormField;
