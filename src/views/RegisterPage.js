import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import AuthTemplate from '../templates/AuthTemplate';
import Heading from '../components/atoms/Heading/Heading';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import { Link } from 'react-router-dom';
import { routes } from '../routes/index';
import { connect } from 'react-redux';
import { createUser as createUserAction } from '../actions/index';
import { Redirect } from 'react-router-dom';
 
const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 0 0 30px 0;
  height: 40px;
  width: 300px;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const RegisterPage = ({token, createUser}) => (
  <AuthTemplate>
    <Formik
      initialValues={{ username: '', password: '', role: 'Customer', email: '', name: '', surname: ''}}
      onSubmit={({ username, password, role, email, name, surname }) => {
        createUser(username, password, role, email, name, surname);
      }}
    >
      {({ handleChange, handleBlur, values }) => {
          
        return(
        <>
          <Heading>Zarejestruj się</Heading>
          <StyledForm>
            <StyledInput
              type="text"
              name="username"
              placeholder="Login"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <StyledInput
              type="password"
              name="password"
              placeholder="Hasło"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
             <StyledInput
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
             <StyledInput
              type="text"
              name="name"
              placeholder="Imię"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
             <StyledInput
              type="text"
              name="surname"
              placeholder="Nazwisko"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.surname}
            />
            <Button activecolor="news" type="submit">
              Zarejestruj
            </Button>
             <StyledLink to={routes.login}>Zaloguj</StyledLink>
          </StyledForm>
        </>
      );
      }}
    </Formik>
  </AuthTemplate>
);

const mapStateToProps = ({ token = null }) => ({
  token,
});

const mapDispatchToProps = dispatch => ({
    createUser: (username, password, role, email, name, surname) => dispatch(createUserAction(username, password, role, email, name, surname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage) ;