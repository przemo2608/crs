import React from 'react';
import { Redirect } from 'react-router-dom';
import {AUTH_SUCCESS} from '../actions/index';
import { routes } from '../routes/index';
import { connect } from 'react-redux';


const LogoutComponent = ({logout}) =>{
   
      logout()
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('state');
       return <Redirect to={routes.login} />
    }

const mapStateToProps = ({ token }) => ({
  token,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: AUTH_SUCCESS, payload: null }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);