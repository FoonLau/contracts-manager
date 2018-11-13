import { combineReducers } from 'redux';
import editorReducer from '../components/ContractEditor/duck';
import listReducer from '../components/ContractList/duck';

export default combineReducers({
  contracts: listReducer,
  currentContract: editorReducer
});
