import * as React from 'react';
import { Button } from 'react-bootstrap';
import { findIndex } from 'lodash';
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
  id?: string;
  fields: Field[];
  onSubmit: (data: any) => void;
}

export interface State {
  id?: string;
  fields: Field[];
}

export default class Form extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State){
    if(nextProps.id !== prevState.id){
      return { 
        id: nextProps.id,
        fields: nextProps.fields
      };
    }

    return null;
 }

  constructor(props: Props) {
    super(props);
    const { id, fields } = props;
    this.state = { id, fields };
  }

  public render() {
    const { fields } = this.state;

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
    const { fields } = this.state;
    const index = findIndex(fields, { name });
    const changedField = fields[index];

    this.setState({
      fields: fields.map((field, i) => {
        if (i === index) {
          return { ...changedField, value };
        }
        return field;
      })
    });
  };

  private handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { fields } = this.state;
    this.props.onSubmit(fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {}));
  };
}
