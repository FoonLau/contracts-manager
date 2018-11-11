import { 
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import { StoreState } from '../types/index';
import rootReducer from './rootReducer';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

export default () => {
  const composeEnhancers = process.env.NODE_ENV === 'production' 
    ? compose
    : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
  
  return createStore<StoreState, any, any, any>(
    rootReducer,
    { 
      contracts: [],
      currentContract: {},
    },
    composeEnhancers(applyMiddleware(thunk))
  );
}
