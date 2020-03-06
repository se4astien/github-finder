// ALL ACTIONS HERE == REPLACE APP.JS
import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

// SET UP GLOBAL STATE
const AlertState = props => {
  const initialState = null;

  // We dispatch any answer to our reducer
  const [state, dispatch] = useReducer(AlertReducer, initialState); // dispatch to our reducer

  // Set Message
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000); // dissepear after 5 secondes
  };

  return (
    // Anything want to display is in this component
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
