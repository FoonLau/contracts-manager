import * as React from 'react';
import { Provider } from 'react-redux';
import { 
  Grid,
  Row,
  Col 
} from 'react-bootstrap';
import configStore from './configStore';
import ContractEditor from '../components/ContractEditor/ContractEditor';
import ContractList from '../components/ContractList/ContractList';
import './App.css';

const store = configStore();

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Grid className="app">
          <Row>
            <Col xs={12} sm={5} smOffset={0}>
              <ContractEditor />
            </Col>
            <Col xs={12} sm={6} smOffset={1}>
              <ContractList />
            </Col>
          </Row>
        </Grid>
      </Provider>
    );
  }
}

export default App;
