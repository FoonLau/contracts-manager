import * as React from 'react';
import { 
  bindActionCreators, 
  Dispatch,
  Action,
  ActionCreator
} from 'redux';
import { connect } from 'react-redux';
import { 
  Contract,
  StoreState
} from 'src/types/index';
import {
  selectContract,
  deleteContract
} from '../duck'

export interface Props extends Contract {
  selectedId: string;
  selectContract: ActionCreator<Action>;
  deleteContract: ActionCreator<Action>
}

export class ContractItem extends React.Component<Props, object> {
  public render () {
    const { id, user: { name, surname }, amountInUsd, currency, date, selectedId } = this.props;
    const className = `contract-item ${ id === selectedId ? 'selected'  : '' }`

    return (
      <tr className={ className } onClick={ this.select }>
        <td>{ name } { surname }</td>
        <td>{ amountInUsd }</td>
        <td>{ currency }</td>
        <td>{ date }</td>
        <td>
          <button onClick={ this.delete }> X </button>
        </td>
      </tr>
    );
  }

  private select = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { selectedId, ...contract } = this.props;
    this.props.selectContract(contract);
  };

  private delete = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.props.deleteContract(this.props.id);
  };
}

export const mapStateToProps = ({ currentContract }: StoreState) => ({
  selectedId: (currentContract as Contract).id
});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  selectContract,
  deleteContract
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContractItem);
