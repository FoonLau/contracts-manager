import * as React from 'react';
import { Button } from 'react-bootstrap';
import Field from './Field/Field';

export interface Field {
  name: string;
  type: string;
  label: string;
  value: string;
}

export interface FormData {
  name: string;
  surname: string;
  amountInUsd: string;
  currency: string;
  date: string;
}

export interface Props {
  fields: Field[];
  onSubmit: (event: React.FormEvent) => void;
}


const Form: React.StatelessComponent<Props> = ({ fields, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
        {
          fields.map(({ name, type, label, value }) => (
            <Field key={name} name={name} type={type} label={label} value={value} />
          ))
        }
        <div>
          <Button 
            className="pull-right"
            bsStyle="warning" 
            type="submit">Save</Button>
        </div>
      </form>
  );
}

export default Form;
