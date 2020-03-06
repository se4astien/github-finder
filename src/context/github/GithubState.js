// ALL ACTIONS HERE == REPLACE APP.JS
import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

// ENV
let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// SET UP GLOBAL STATE
const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  // We dispatch any answer to our reducer
  const [state, dispatch] = useReducer(GithubReducer, initialState); // dispatch to our reducer

  // Now we can start all of actions

  // Search Users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    // When we made this request, we got response.data back from our request and we are sending payload to the reducer
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items // payload is the data we want to send
    });
  };

  // Get Single GitHub User
  const getUser = async login => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // Get Repos
  const getUserRepos = async login => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Clear GitHub Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS }); // dispatch to reducer

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING }); // dispatch to our reducer

  return (
    // Anything want to display is in this component
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
