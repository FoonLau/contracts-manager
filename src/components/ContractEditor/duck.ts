import { Dispatch } from 'redux';
import { 
  Contract
} from '../../types/index';
import {  
  SELECT_CONTRACT,
  DELETE_CONTRACT,
  SelectContract,
  DeleteContract
} from '../ContractList/duck';

// action constants
const prefix = 'app/editor/';
export const EDIT_CONTRACT = `${prefix}EDIT_CONTRACT`;
export type EDIT_CONTRACT = typeof EDIT_CONTRACT;

export const CREATE_CONTRACT_SUCCESS = `${prefix}CREATE_CONTRACT_SUCCESS`;
export type CREATE_CONTRACT_SUCCESS = typeof CREATE_CONTRACT_SUCCESS;

export const UPDATE_CONTRACT_SUCCESS = `${prefix}UPDATE_CONTRACT_SUCCESS`;
export type UPDATE_CONTRACT_SUCCESS = typeof UPDATE_CONTRACT_SUCCESS;

export interface EditContract {
  type: EDIT_CONTRACT;
  payload: {
    data: {
      name: string;
      value: string;
    }
  };
}

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
export const editContract = (data: { name: string; value: string; }) => ({
  type: EDIT_CONTRACT,
  payload: {
    data
  }
});

export const createContract = (contract: Contract) => (dispatch: Dispatch<CreateContractSuccess>) => {
  const data = { ...contract, id: new Date().getTime().toString() };

  dispatch({
    type: CREATE_CONTRACT_SUCCESS,
    payload: {
      contract: data
    }
  });
};

export const updateContract = (contract: Contract) => (dispatch: Dispatch<UpdateContractSuccess>) => {
  dispatch({
    type: UPDATE_CONTRACT_SUCCESS,
    payload: {
      contract
    }
  });
};

export const initialState = { user: { name: '', surname: '' }, amountInUsd: '', currency: '', date: '' };

// reducer
export default (state: Contract = initialState, action: SuccessAction | SelectContract | DeleteContract | EditContract): Contract | {} => {
  switch(action.type) {
    case EDIT_CONTRACT:
      const { name, value } = (action as EditContract).payload.data;
      if (name === 'name' || name === 'surname') {
        const { user } = state;
        return { ...state, user: { ...user, [ name ]: value }};
      }
      return { ...state, [ name ]: value };
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
