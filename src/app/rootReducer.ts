import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import editorReducer from '../components/ContractEditor/duck';
import listReducer from '../components/ContractList/duck';

export default combineReducers({
  contracts: listReducer,
  currentContract: editorReducer,
  form: formReducer
});
