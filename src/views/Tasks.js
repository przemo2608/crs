import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routes } from '../routes/index';
import GridTemplate from '../templates/GridTemplate';
import TaskCard from '../components/molecules/Card/TaskCard';
import { fetchUserTasks, fetchMechanicTasks } from '../actions/index';
import { Redirect } from 'react-router-dom';

class Tasks extends Component {
  componentDidMount() {
    const { GetUserTasks, GetMechanicTasks, user } = this.props;
    if(user.role == 'Customer') GetUserTasks(localStorage.getItem('user'));
     if(user.role == 'Mechanic') GetMechanicTasks(localStorage.getItem('user'));
  }


  render() {
    const { tasks, user } = this.props;
         if (user.role == 'Admin') {
          return <Redirect to={routes.admintasks} />;
        }

    return (
      <GridTemplate>
        {tasks.map(({title, description, status, carBrand, carModel}) => (
          <TaskCard
            title={title}
            description={description}
            status={status}
            carBrand={carBrand}
            carModel={carModel}
            key={title}
          />
        ))}
      </GridTemplate>
    );
  }
}


Tasks.defaultProps = {
  tasks: [],
};

const mapStateToProps = state => {
  const { tasks, user } = state;
  return { tasks, user };
};

const mapDispatchToProps = dispatch => ({
  GetUserTasks: (userId) => dispatch(fetchUserTasks(userId)),
   GetMechanicTasks: (userId) => dispatch(fetchMechanicTasks(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);