import * as React from 'react';
import { 
  bindActionCreators,
  Dispatch,
  ActionCreator,
  Action
} from 'redux';
import { connect } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { 
  Contract,
  CurrentContract,
  StoreState
} from '../../types/index';
import Form from '../Form/Form';
import { 
  createContract,
  updateContract,
  editContract
} from './duck';

export interface Props {
  contract: CurrentContract;
  createContract: ActionCreator<ThunkAction<any, any, any, any>>;
  updateContract: ActionCreator<ThunkAction<any, any, any, any>>;
  editContract: ActionCreator<Action>;
}

export interface FormData {
  name: string;
  surname: string;
  amountInUsd: string;
  currency: string;
  date: string;
}

const FIELDS = [ 
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'surname', type: 'text', label: 'Surname' },
  { name: 'amountInUsd', type: 'text', label: 'Amount(USD)' },
  { name: 'currency', type: 'text', label: 'Currency' },
  { name: 'date', type: 'text', label: 'Date' }
];

export class ContractEditor extends React.Component<Props, object> {
  public render() {
    const { contract } = this.props;
    const fields = FIELDS.map(field => {
      if ((field.name === 'name' || field.name === 'surname') && (contract as Contract).user) {
        return ({ ...field, value: (contract as Contract).user[field.name] });
      }
      return ({ ...field, value: contract[field.name] });
    });

    return <Form fields={fields} onChange={this.handleChange} onSubmit={this.handleSubmit} />;
  }

  private handleChange = (data: { name: string; value: string; }): void => {
    this.props.editContract(data);
  };

  private handleSubmit = (): void => {
    const { contract } = this.props;

    if ((contract as Contract).id) {
      this.props.updateContract((contract as Contract));
    } else {
      this.props.createContract(contract);
    }
  }
}

export const mapStateToProps = (state: StoreState) => ({ contract: state.currentContract });

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  createContract,
  updateContract,
  editContract
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContractEditor);
