import { Dispatch } from 'redux';
import { 
  Contract,
  CurrentContract
} from '../../types/index';
import {  
  SELECT_CONTRACT,
  DELETE_CONTRACT,
  SelectContract,
  DeleteContract
} from '../ContractList/duck';

// action constants
const prefix = 'app/editor/';
export const CREATE_CONTRACT = `${prefix}CREATE_CONTRACT`;
export type CREATE_CONTRACT = typeof CREATE_CONTRACT;

export const CREATE_CONTRACT_SUCCESS = `${prefix}CREATE_CONTRACT_SUCCESS`;
export type CREATE_CONTRACT_SUCCESS = typeof CREATE_CONTRACT_SUCCESS;

export const UPDATE_CONTRACT = `${prefix}UPDATE_CONTRACT`;
export type UPDATE_CONTRACT = typeof UPDATE_CONTRACT;

export const UPDATE_CONTRACT_SUCCESS = `${prefix}UPDATE_CONTRACT_SUCCESS`;
export type UPDATE_CONTRACT_SUCCESS = typeof UPDATE_CONTRACT_SUCCESS;

export interface CreateContractSuccess {
  type: CREATE_CONTRACT_SUCCESS;
  payload: {
    contract: Contract;
  };
}

export interface UpdateContractSuccess {
  type: UPDATE_CONTRACT_SUCCESS;
  payload: {
    contract: Contract;
  };
}

export type SuccessAction = CreateContractSuccess | UpdateContractSuccess;

// action creators
export const createContract = (contract: Contract) => (dispatch: Dispatch<CreateContractSuccess>) => {
  const data = { ...contract, id: new Date().getTime().toString() };

  dispatch({
    type: CREATE_CONTRACT_SUCCESS,
    payload: {
      contract: data
    }
  });
};
export const createContractSuccess = (contract: Contract): CreateContractSuccess => ({
  type: CREATE_CONTRACT_SUCCESS,
  payload: {
    contract
  }
});

export const updateContract = (contract: Contract) => (dispatch: Dispatch<CreateContractSuccess>) => {
  dispatch({
    type: UPDATE_CONTRACT_SUCCESS,
    payload: {
      contract
    }
  });
};

export const updateContractSuccess = (contract: Contract): UpdateContractSuccess => ({
  type: UPDATE_CONTRACT_SUCCESS,
  payload: {
    contract
  }
});

export const initialState = { user: { name: '', surname: '' }, amountInUsd: '', currency: '', date: '' };

// reducer
export default (state: CurrentContract = initialState, action: SuccessAction | SelectContract | DeleteContract): Contract | {} => {
  switch(action.type) {
    case CREATE_CONTRACT_SUCCESS:
    case UPDATE_CONTRACT_SUCCESS:
      return initialState;
    case SELECT_CONTRACT:
      return (action as SelectContract).payload.contract;
    case DELETE_CONTRACT:
      if ((state as Contract).id === (action as DeleteContract).payload.id) {
        return initialState;
      }
      return state;
    default:
      return state;
  }
}
