import { shallow } from 'enzyme';
import React from 'react';
import { Login } from './index';

describe('Login', () => {
  const loginObject = {
    requesting: true,
    successful: false,
    messages: [],
    errors: [],
  };

  const errors = [
    {
      body: 'Request failed with status code 400',
      time: '2017-07-27T20:02:27.683Z',
    },
  ];

  it('can render', () => {
    const wrapper = shallow(<Login login={loginObject} />);
    expect(wrapper).toBeDefined();
  });

  it('can render with errors', () => {
    const wrapper = shallow(<Login login={{ ...loginObject,
      requesting: false,
      errors,
      messages: errors }}
    />);
    expect(wrapper).toBeDefined();
  });
});
