import * as React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import './Field.css';

export interface Props {
  name: string;
  label: string;
  type: 'text' | 'number';
  value: string;
}

export const RawField: React.StatelessComponent<Props & WrappedFieldProps> = ({
  input: { value: val, ...inputs },
  label,
  type,
  meta: { touched, error },
  value
}) => {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div>
        <input className="field-input" {...inputs} placeholder={label} type={type} value={value} />
      </div>
      {touched && error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default ({ name, label, type, value }: Props) => {
  return <Field name={name} type={type} label={label} value={value} component={RawField} />;
}
