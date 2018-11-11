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
  UpdateContract
} from './duck';

export interface Props {
  contract: CurrentContract;
  createContract: ActionCreator<ThunkAction<any, any, any, any>>;
  updateContract: (contract: Contract) => UpdateContract;
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

    return <Form fields={fields} onSubmit={this.handleSubmit} />;
  }

  private handleSubmit = ({ name, surname, amountInUsd, currency, date }: FormData): void => {
    const { contract } = this.props;
    const updatedContract = {
      id: (contract as Contract).id,
      user: { name, surname },
      amountInUsd,
      currency,
      date
    };

    if ((contract as Contract).id) {
      this.props.updateContract(updatedContract);
    } else {
      this.props.createContract(updatedContract);
    }
  }
}

export const mapStateToProps = (state: StoreState) => ({ contract: state.currentContract });

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  createContract,
  updateContract
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContractEditor);
