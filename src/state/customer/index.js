import React, {
  createContext,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';

const FETCH_CUSTOMER = 'glic-dtc/customer/FETCH_CUSTOMER';
const FETCH_CUSTOMER_SUCCEEDED = 'glic-dtc/customer/FETCH_CUSTOMER_SUCCEEDED';

function customerReducer(state, action) {
  switch(action.type) {
    case FETCH_CUSTOMER:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CUSTOMER_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
}

const initialState = {
  isLoading: false,
  data: null,
};

const localState = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('customer'));

function useCustomerState() {
  const [state, dispatch] = useReducer(customerReducer, localState || initialState);
  const actions = {
    async fetchCustomer() {
      try {
        dispatch({ type: FETCH_CUSTOMER, });
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random()*151)+1}`);
        const { data } = response;
        console.log('response data is', data);
        dispatch({
          type: FETCH_CUSTOMER_SUCCEEDED,
          payload: data,
        });

      } catch(e) {
        console.error('Could not fetchCustomer', e);
      }
    },
  };

  return [state, actions];
}

export const CustomerContext = createContext();

function WithCustomerState({ children }) {
  const [state, actions] = useCustomerState();
  useEffect(() => {
    try {
      window.localStorage.setItem('customer', JSON.stringify(state));
    } catch(e) {
      console.debug('Cannot persist state to localStorage', e);
    }
  }, [state]);

  return (
    <CustomerContext.Provider value={{state, actions}}>
      {children}
    </CustomerContext.Provider>
  );
}

export default WithCustomerState;
