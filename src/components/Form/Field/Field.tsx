import * as React from 'react';
import './Field.css';

export interface Props {
  name: string;
  label: string;
  type: string;
  value: string;
}

const Field: React.StatelessComponent<Props> = ({
  label,
  type,
  name,
  value
}) => {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div>
        <input 
          name={name}
          className="field-input"
          placeholder={label} 
          type={type} 
          value={value} />
      </div>
    </div>
  );
}

export default Field;
