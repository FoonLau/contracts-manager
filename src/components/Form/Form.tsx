import * as React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Button } from 'react-bootstrap';
import Field from './Field/Field';
import { required } from '../../services/validation';

export interface Field {
  name: string;
  type: 'text' | 'number';
  label: string;
  value: string;
}

export interface Props {
  fields: Field[];
  onSubmit: () => void;
}

export const Form: React.StatelessComponent<Props & InjectedFormProps<{}, Props>> = ({ fields, handleSubmit, pristine, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
        {
          fields.map(({ name, type, label, value }) => (
            <Field key={name} name={name} type={type} label={label} value={value} />
          ))
        }
        <div>
          <Button 
            className="pull-right"
            bsStyle="warning" 
            type="submit" 
            disabled={pristine || submitting}>Save</Button>
        </div>
      </form>
  );
}

export default reduxForm({
  form: 'contract',
  validate: required
})(Form)
