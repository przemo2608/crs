import axios from 'axios';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const NEWS_REQUEST = 'NEWS_REQUEST';
export const NEWS_SUCCESS = 'NEWS_SUCCESS';
export const NEWS_FAILURE = 'NEWS_FAILURE';

export const ADD_NEWS_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_NEWS_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_NEWS_FAILURE = 'ADD_ITEM_FAILURE';

export const REMOVE_NEWS_REQUEST = 'REMOVE_NEWS_REQUEST';
export const REMOVE_NEWS_SUCCESS = 'REMOVE_NEWS_SUCCESS';
export const REMOVE_NEWS_FAILURE = 'REMOVE_NEWS_FAILURE';

export const CUSTOMERS_REQUEST = 'CUSTOMERS_REQUEST';
export const CUSTOMERS_SUCCESS = 'CUSTOMERS_SUCCESS';
export const CUSTOMERS_FAILURE = 'CUSTOMERS_FAILURE';

export const REMOVE_CUSTOMERS_REQUEST = 'REMOVE_CUSTOMERS_REQUEST';
export const REMOVE_CUSTOMERS_SUCCESS = 'REMOVE_CUSTOMERS_SUCCESS';
export const REMOVE_CUSTOMERS_FAILURE = 'REMOVE_CUSTOMERS_FAILURE';

export const authenticate = (username, password) => dispatch => {
  dispatch({ type: AUTH_REQUEST });

  return axios
    .post('https://crs-server.somee.com/api/login', {
      username,
      password,
      
  },
    
    )
    .then(payload => {
      console.log(payload.data.token);
      dispatch({ type: AUTH_SUCCESS, payload });
      localStorage.setItem('token', payload.data.token);
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: AUTH_FAILURE });
    });
};

export const createUser = (username, password, role, email, name, surname) => dispatch => {
  dispatch({ type: REGISTER_REQUEST });

  return axios
    .post('https://crs-server.somee.com/api/users/createUser', {
      username,
      password,
      role,
      email,
      name,
      surname
      
  },
    
    )
     .then(() => {
       dispatch(fetchCustomers());
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE });
    });
};

export const fetchNews = () => (dispatch, getState) => {
  dispatch({ type: NEWS_REQUEST });

  return axios
    .get('https://crs-server.somee.com/api/news/getNews', {
      params: {
        token: getState().token,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: NEWS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: NEWS_FAILURE });
    });
  };

 

    export const addNews = (newsContent) => (dispatch, getState) => {
  dispatch({ type: ADD_NEWS_REQUEST });

  return axios
    .post('https://crs-server.somee.com/api/news/createNews', {
      token: getState().token,
      ...newsContent,
    })
    .then(() => {
      dispatch(fetchNews())
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_NEWS_FAILURE });
    });
}; 

export const removeNews = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_NEWS_REQUEST });
console.log(id)
  axios
    .delete('https://crs-server.somee.com/api/news/deleteNews', {
  headers: {
    Authorization: getState().token
  },
  data: {
    newsId: id
  }
})
    .then(() => {
       dispatch(fetchNews());
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REMOVE_NEWS_FAILURE });
    });
};


 export const fetchCustomers = () => (dispatch, getState) => {
  dispatch({ type: CUSTOMERS_REQUEST });

  return axios
    .get('https://crs-server.somee.com/api/users/getCustomers', {
      params: {
        token: getState().token,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: CUSTOMERS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: CUSTOMERS_FAILURE });
    });
  };

  export const removeUser = (userId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_NEWS_REQUEST });
console.log(userId)
  axios
    .delete('https://crs-server.somee.com/api/users/deleteUser', {
  headers: {
    Authorization: getState().token
  },
  data: {
    userId: userId
  }
})
    .then(() => {
       dispatch(fetchCustomers());
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REMOVE_NEWS_FAILURE });
    });
};

