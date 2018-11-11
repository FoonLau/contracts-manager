import * as React from 'react';
import { connect } from 'react-redux';
import { 
  Contract,
  Contracts,
  StoreState
} from '../../types/index';
import ContractItem from './ContractItem/ContractItem';
import './ContractList.css'

export interface Props {
  contracts: Contracts
}

export const ContractList: React.StatelessComponent<Props>  = ({ contracts }) => {
  return (
    <table className="contract-list">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount(USD)</th>
          <th>Currency</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          (contracts as []).map((contract: Contract) => <ContractItem key={ contract.id } {...contract} />)
        }
      </tbody>
    </table>
  );
};

export const mapStateToProps = ({ contracts }: StoreState) => ({ contracts });

export default connect(mapStateToProps, null)(ContractList);
