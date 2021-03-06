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

export const WORKERS_REQUEST = 'WORKERS_REQUEST';
export const WORKERS_SUCCESS = 'WORKERS_SUCCESS';
export const WORKERS_FAILURE = 'WORKERS_FAILURE';

export const CARS_REQUEST = 'CARS_REQUEST';
export const CARS_SUCCESS = 'CARS_SUCCESS';
export const CARS_FAILURE = 'CARS_FAILURE';

export const REMOVE_CAR_REQUEST = 'REMOVE_CAR_REQUEST';
export const REMOVE_CAR_SUCCESS = 'REMOVE_CAR_SUCCESS';
export const REMOVE_CAR_FAILURE = 'REMOVE_CAR_FAILURE';

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const USER_TASKS_REQUEST = 'USER_TASKS_REQUEST';
export const USER_TASKS_SUCCESS = 'USER_TASKS_SUCCESS';
export const USER_TASKS_FAILURE = 'USER_TASKS_FAILURE';

export const MECHANIC_TASKS_REQUEST = 'MECHANIC_TASKS_REQUEST';
export const MECHANIC_TASKS_SUCCESS = 'MECHANIC_TASKS_SUCCESS';
export const MECHANIC_TASKS_FAILURE = 'MECHANIC_TASKS_FAILURE';

export const ALL_CARS_REQUEST = 'ALL_CARS_REQUEST';
export const ALL_CARS_SUCCESS = 'ALL_CARS_SUCCESS';
export const ALL_CARS_FAILURE = 'ALL_CARS_FAILURE';

export const CHANGE_TASK_REQUEST = 'CHANGE_TASK_REQUEST';
export const CHANGE_TASK_SUCCESS = 'CHANGE_TASK_SUCCESS';
export const CHANGE_TASK_FAILURE = 'CHANGE_TASK_FAILURE';

export const authenticate = (username, password) => dispatch => {
  dispatch({ type: AUTH_REQUEST });

  return axios
    .post('https://crs-server.somee.com/api/login', {
      username,
      password,
      
  },
    
    )
    .then(payload => {
      console.log(payload.data);
      dispatch({ type: AUTH_SUCCESS, payload });
      localStorage.setItem('token', payload.data.token);
      localStorage.setItem('user', payload.data.user.userId);
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: AUTH_FAILURE });
      alert("logowanie nie powiodło się")
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
       dispatch(fetchWorkers());
       alert('dodano użytkownika')
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE });
      alert('nie udało się')
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
      Authorization: getState().token,
      ...newsContent,
    })
    .then(() => {
      dispatch(fetchNews())
      alert("dodano news")
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_NEWS_FAILURE });
       alert("nie dodano newsa")
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
      headers: {
        Authorization: getState().token,
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

   export const fetchWorkers = () => (dispatch, getState) => {
  dispatch({ type: WORKERS_REQUEST });

  return axios
    .get('https://crs-server.somee.com/api/users/getWorkers', {
      headers: {
        Authorization: getState().token,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: WORKERS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: WORKERS_FAILURE });
    });
  };

  export const removeUser = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_NEWS_REQUEST });
console.log(id)
  axios
    .delete('https://crs-server.somee.com/api/users/deleteUser', {
  headers: {
    Authorization: getState().token
  },
  data: {
    userId: id
  }
})
    .then(() => {
       dispatch(fetchCustomers());
       dispatch(fetchWorkers());
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REMOVE_NEWS_FAILURE });
    });
};

export const  createCar = (carBrand, model, registrationNumber) => (dispatch, getState) => {
  dispatch({ type: REGISTER_REQUEST });

  return axios
    .post('https://crs-server.somee.com/api/cars/createCar', {
      userId: getState().user.userId,
      carBrand,
      model,
      registrationNumber,
    
      
  },
    
    )
     .then(() => {
       dispatch(fetchCars(localStorage.getItem('user')));
       alert('dodano samochód')
      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE });
      alert('nie udało się dodać samochodu')
    });
};

  export const fetchCars = (userId) => ( dispatch, getState) => {
  dispatch({ type: CARS_REQUEST });

  return axios
    .get(`https://crs-server.somee.com/api/cars/getCars/${userId}`, {
      headers: {
        Authorization: getState().token,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: CARS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: CARS_FAILURE });
    });
  };

  export const removeCar = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_CAR_REQUEST });
console.log(id)
  axios
    .delete('https://crs-server.somee.com/api/cars/deleteCar', {
  headers: {
    Authorization: getState().token
  },
  data: {
    userId: getState().user.userId,
    carId: id
  }
})
    .then(() => {
       dispatch(fetchCars(localStorage.getItem('user')));
      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REMOVE_CAR_FAILURE });
    });
};


export const createTask = (title, description, carId, customerId, mechanicId) => (dispatch) => {
  dispatch({ type: CREATE_TASK_REQUEST });

  return axios
    .post('https://crs-server.somee.com/api/orders/createOrder', {
      title,
      description,
      carId,
      customerId,
      mechanicId
      
  },
    
    )
     .then(() => {
       alert('dodano zlecenie dla mechanika')
      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: CREATE_TASK_FAILURE });
       alert('nie udało się')
    });
};

export const fetchUserTasks = (userId) => ( dispatch, getState) => {
  dispatch({ type: USER_TASKS_REQUEST });

  return axios
    .get(`https://crs-server.somee.com/api/orders/getOrdersForCustomer/${userId}`, {
      headers: {
        Authorization: getState().token,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: USER_TASKS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: USER_TASKS_FAILURE });
    });
  };


  export const fetchMechanicTasks = (userId) => ( dispatch, getState) => {
  dispatch({ type: MECHANIC_TASKS_REQUEST });

  return axios
    .get(`https://crs-server.somee.com/api/orders/getOrdersForWorker/${userId}`, {
      headers: {
        Authorization: getState().token,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: MECHANIC_TASKS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: MECHANIC_TASKS_FAILURE });
    });
  };

  export const fetchAllCars = () => (dispatch, getState) => {
  dispatch({ type: ALL_CARS_REQUEST });

  return axios
    .get('https://crs-server.somee.com/api/cars/getAllCars', {
      params: {
        token: getState().token,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: ALL_CARS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ALL_CARS_FAILURE });
    });
  };

    export const changeTaskStatus = (id) => (dispatch, getState) => {
  dispatch({ type: CHANGE_TASK_REQUEST });
console.log(id)
  axios
    .put('https://crs-server.somee.com/api/orders/changeOrderStatus', {
       orderId: id,
      Status: "zakonczone",
 
 
},)
    .then(() => {
       dispatch(fetchMechanicTasks(localStorage.getItem('user')));
      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: CHANGE_TASK_FAILURE });
    });
};