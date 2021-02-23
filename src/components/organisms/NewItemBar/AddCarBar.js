import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import withContext from '../../../hoc/withContext';
import Heading from '../../atoms/Heading/Heading';
import { connect } from 'react-redux';
import { createCar as createCarAction } from '../../../actions/index';
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
  margin-top: 15px;
  margin-bottom: 15px;
`;

const AddCarBar = ({ pageContext, isVisible, createCar, handleClose }) => (
  <StyledWrapper isVisible={isVisible} activecolor={pageContext}>
   {pageContext=='cars' && <Heading big>Dodaj Samochód</Heading>}
   
    <Formik
      initialValues={{ carBrand: '', model: '', registrationNumber: ''}}
      onSubmit={({ carBrand, model, registrationNumber }, {resetForm}) => {
        createCar(carBrand, model, registrationNumber);
        handleClose();
        resetForm({})
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm>
           <StyledInput
              type="text"
              name="carBrand"
              placeholder="Marka"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.carBrand}
            />
            <StyledInput
              type="text"
              name="model"
              placeholder="Model"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.model}
            />
             <StyledInput
              type="text"
              name="registrationNumber"
              placeholder="Numer rejestracyjny"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.registrationNumber}
            />
            
          <Button type="submit" activecolor={pageContext}>
            Dodaj
          </Button>
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

AddCarBar.propTypes = {
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']),
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

AddCarBar.defaultProps = {
  pageContext: 'news',
  isVisible: false,
};

const mapDispatchToProps = dispatch => ({
    createCar: (carBrand, model, registrationNumber) => dispatch(createCarAction(carBrand, model, registrationNumber)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withContext(AddCarBar));