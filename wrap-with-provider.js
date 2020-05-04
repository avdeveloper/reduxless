import React from 'React';
import WithCustomerState from './src/state/customer';

export default ({ element }) => (
  <WithCustomerState>
    {element}
  </WithCustomerState>
);
