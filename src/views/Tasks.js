import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GridTemplate from '../templates/GridTemplate';
import Card from '../components/molecules/Card/Card';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import { fetchCustomers, fetchWorkers, createTask as createTaskAction, fetchCars } from '../actions/index';
import { Formik, Form, Field } from 'formik';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  height: 30vh;
`;

class Tasks extends Component {
  componentDidMount() {
    const { GetCustomers, GetWorkers} = this.props;
    GetCustomers();
     GetWorkers();
  }

  
 

  render() {
    const { customers, workers, createTask, GetCars, cars  } = this.props;

    return (
        <GridTemplate>
       <Formik
      initialValues={{ title: '', description: '', carId: null, customerId: null, mechanicId: null}}
      onSubmit={({ title, description, carId, customerId, mechanicId }) => {
        createTask(title, description, carId, customerId, mechanicId);
        
      }}
    >
      {({ values, handleChange, handleBlur,  }) => (
          
        <StyledForm>
           <StyledInput
              type="text"
              name="title"
              placeholder="Tytuł"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
             <StyledTextArea
            name="description"
            as="textarea"
            placeholder="Opis"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
            <Field as="select" name="customerId" placeholder="wybierz">
            {customers.map((customer =>  <option value={customer.id}>{customer.name} {customer.surname}</option>))}
           </Field>
           
          {values.customerId != null && <Field as="select" name="mechanicId" placeholder="wybierz">
            {workers.map((worker =>  <option value={worker.id}>{worker.name} {worker.surname}</option>))}
           </Field>}

           {values.customerId != null && <Field as="select" name="carId">
            {cars.map((car =>  <option value={car.id}>{car.carBrand} {car.model}</option>))}
           </Field>}
           
          <Button type="submit" activecolor="tasks">
            Dodaj
          </Button>
          {values.customerId == null ? null : GetCars(values.customerId)} 
        </StyledForm>
      )}
     
    </Formik>
    </GridTemplate>
  

    );
  }
}

Tasks.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
     
    }),
  ),
};

Tasks.defaultProps = {
  customers: [],
  workers: [],
  cars: []
};

const mapStateToProps = state => {
  const { customers, workers, cars } = state;
  return { customers, workers, cars };
};

const mapDispatchToProps = dispatch => ({
  GetCustomers: () => dispatch(fetchCustomers()),
   GetWorkers: () => dispatch(fetchWorkers()),
   GetCars: (userId) => dispatch(fetchCars(userId)),
   createTask: (title, description, carId, customerId, mechanicId) => dispatch(createTaskAction(title, description, carId, customerId, mechanicId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);