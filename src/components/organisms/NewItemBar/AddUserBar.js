import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import withContext from '../../../hoc/withContext';
import Heading from '../../atoms/Heading/Heading';
import { connect } from 'react-redux';
import { createUser as createUserAction } from '../../../actions/index';
import { Formik, Form, Field } from 'formik';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  height: 30vh;
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
`;

const AddUserBar = ({ pageContext, isVisible, createUser, handleClose }) => (
  <StyledWrapper isVisible={isVisible} activecolor={pageContext}>
   {pageContext=='customers' && <Heading big>Dodaj Klienta</Heading>}
    {pageContext=='workers' && <Heading big>Dodaj Pracownika</Heading>}
    <Formik
      initialValues={{ username: '', password: '', role: 'Customer', email: '', name: '', surname: ''}}
      onSubmit={({ username, password, role, email, name, surname }) => {
        createUser(username, password, role, email, name, surname);
        handleClose();
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm>
          {pageContext=='workers' && <> <div id="my-radio-group">Rola</div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="role" value="Mechanic" />
              Mechanik
            </label>
            <label>
              <Field type="radio" name="role" value="Admin" />
              Administrator
            </label>
            <div>Picked: {values.role}</div>
          </div>
</>}
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
          <Button type="submit" activecolor={pageContext}>
            Dodaj
          </Button>
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

AddUserBar.propTypes = {
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']),
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

AddUserBar.defaultProps = {
  pageContext: 'news',
  isVisible: false,
};

const mapDispatchToProps = dispatch => ({
    createUser: (username, password, role, email, name, surname) => dispatch(createUserAction(username, password, role, email, name, surname)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withContext(AddUserBar));