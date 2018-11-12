import { 
  Contract,
  Contracts
} from '../../types/index';
import { 
  SuccessAction,
  CREATE_CONTRACT_SUCCESS,
  UPDATE_CONTRACT_SUCCESS
} from '../ContractEditor/duck';

// action constants
const prefix = 'app/list/';
export const DELETE_CONTRACT = `${prefix}DELETE_CONTRACT`;
export type DELETE_CONTRACT = typeof DELETE_CONTRACT;

export const SELECT_CONTRACT = `${prefix}SELECT_CONTRACT`;
export type SELECT_CONTRACT = typeof SELECT_CONTRACT;

// action types
export interface DeleteContract {
  type: DELETE_CONTRACT;
  payload: {
    id: string
  };
}
export interface SelectContract {
  type: SELECT_CONTRACT;
  payload: {
    contract: Contract;
  };
}

// action creators
export const deleteContract = (id: string): DeleteContract => ({
  type: DELETE_CONTRACT,
  payload: {
    id
  }
});
export const selectContract = (contract: Contract) => ({
  type: SELECT_CONTRACT,
  payload: {
    contract
  }
});

// reducer
export default (state: Contracts = [], action: SuccessAction | DeleteContract): Contract[] => {
  switch(action.type) {
    case CREATE_CONTRACT_SUCCESS:
      return [ ...state, (action as SuccessAction).payload.contract ];
    case UPDATE_CONTRACT_SUCCESS:
      const { contract: updatedContract } = (action as SuccessAction).payload;
      return (state as []).map(( contract: Contract ) => {
        if (contract.id === updatedContract.id) {
          return updatedContract;
        }

        return contract;
      });
    case DELETE_CONTRACT:
      return [ ...(state as []).filter(
          ({ id }: Contract) => id !== (action as DeleteContract).payload.id
        ) ];
    default:
      return state;
  }
}
