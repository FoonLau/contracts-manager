import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Field from './Field';

it('should render correctly', () => {
  const tree = renderer.create(<Field name="name" label="name" type="text" value="John" />);

  expect(tree).toMatchSnapshot();
});
