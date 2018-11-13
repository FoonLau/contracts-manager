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
  onSubmit?: () => void;
  onChange?: (data: any) => void;
}

export default class Form extends React.Component<Props, object> {
  public render() {
    const { fields } = this.props;

    return (
      <form onSubmit={ this.handleSubmit } onChange={ this.handleChange }>
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

  private handleChange = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { name, value } = (event.target as HTMLInputElement);
    
    if (this.props.onChange) {
      this.props.onChange({ name, value });
    }
  };

  private handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };
}
