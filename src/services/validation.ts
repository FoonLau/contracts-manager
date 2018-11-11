import { FormErrors, Validator } from 'redux-form';

export const requiredValidator = (value?: string): string | void => {
  if (!value) {
    return 'This field is required.';
  }
}

interface Field {
  name: string;
}

export interface Props {
  fields: Field[];
}

export const required: Validator = (values, props: Props): FormErrors => {
  const errors = {};

  props.fields.forEach(({ name }) => {
    errors[name] = requiredValidator(values[name]);
  })

  return errors;
};
