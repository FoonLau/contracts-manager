import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import ContractEditor from '../components/ContractEditor/ContractEditor';
import ContractList from '../components/ContractList/ContractList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should has contract dditor and list', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.find(ContractEditor)).toHaveLength(1);
  expect(wrapper.find(ContractList)).toHaveLength(1);
});
