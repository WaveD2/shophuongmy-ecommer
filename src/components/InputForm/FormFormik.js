import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
  WrapperInputStyle,
  LabelInput,
  MessError,
  ContainerInput,
} from "./style";
import HookDebounce from "../../utils/HookDebounce";

const FormFormik = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  handleDelete,
  textButton1,
  isButton2,
  textButton2,
  componentChildren,
}) => {
  return (
    <Formik
      initialValues={initialValues || {}}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ dirty, isValid }) => (
        <FormikForm>
          <div>
            {fields.map((field, index) => (
              <div key={index}>
                {field.component ? (
                  <WrapperInputStyle
                    component={field.component}
                    {...field}
                    key={index}
                  />
                ) : (
                  <ContainerInput key={field.name}>
                    <LabelInput htmlFor={field.name}>{field.label}</LabelInput>
                    <WrapperInputStyle
                      as={field?.as}
                      id={field?.name}
                      name={field?.name}
                    />
                  </ContainerInput>
                )}
                <ErrorMessage name={field.name} component={MessError} />
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}>
            {textButton1 && (
              <ButtonComponent
                disabled={!dirty || !isValid}
                type="submit"
                size={40}
                className="boxBtn"
                textButton={textButton1}
              />
            )}
            {isButton2 && (
              <ButtonComponent
                onClick={handleDelete}
                type="button"
                size={40}
                className="boxBtn"
                textButton={textButton2}
              />
            )}
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default FormFormik;
