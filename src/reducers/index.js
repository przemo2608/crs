import { CUSTOMERS_SUCCESS, AUTH_SUCCESS, WORKERS_SUCCESS, NEWS_SUCCESS,  ADD_NEWS_SUCCESS  } from '../actions/index';


const initialState = {
     
}

const rootReducer = (state = initialState, action) => {
       switch (action.type) {
            case NEWS_SUCCESS:
                return {
                     ...state,
                      news: [...action.payload.data],
      };
       case CUSTOMERS_SUCCESS:
                return {
                     ...state,
                      customers: [...action.payload.data],
      };
       case WORKERS_SUCCESS:
                return {
                     ...state,
                      workers: [...action.payload.data],
      };
            case AUTH_SUCCESS:
                return {
                    ...state,
                    token: action.payload?.data?.token,
                    user: action.payload?.data?.user
                }
                default:
                    return state;
       }
};

export default rootReducer;