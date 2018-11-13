import * as React from 'react';
import { shallow } from 'enzyme';
import From from './Form';
import Field from './Field/Field';

const mockEvent = { preventDefault: () => {}, stopPropagation: () => {} };

it('should render correct fields', () => {
  const props = {
    fields: [
      { name: 'currency', type: 'text', label: 'Currency', value: 'USD' },
      { name: 'amount', type: 'number', label: 'Amount', value: '10' }
    ]
  };
  const wrapper = shallow(<From { ...props } />);

  expect(wrapper.find(Field)).toHaveLength(2);
});

it('should call submit handler when submit', () => {
  const fn = jest.fn();
  const props = {
    fields: [
      { name: 'currency', type: 'text', label: 'Currency', value: 'USD' }
    ],
    onSubmit: fn
  };
  const wrapper = shallow(<From { ...props } />);
  wrapper.find('form').simulate('submit', mockEvent);

  expect(fn).toBeCalled();
});

it('should call change handler when value change', () => {
  const fn = jest.fn();
  const props = {
    fields: [
      { name: 'currency', type: 'text', label: 'Currency', value: 'USD' }
    ],
    onChange: fn
  };
  const wrapper = shallow(<From { ...props } />);
  wrapper.find('form').simulate('change', { ...mockEvent, target: { name: 'currency', value: 'CNY' } });

  expect(fn).toBeCalledWith({ name: 'currency', value: 'CNY' });
});
