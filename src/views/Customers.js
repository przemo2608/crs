import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from '../templates/GridTemplate';
import UserCard from '../components/molecules/Card/UserCard';
import { fetchCustomers } from '../actions/index';

class Customers extends Component {
  componentDidMount() {
    const { GetCustomers } = this.props;
    GetCustomers();
  }


  render() {
    const { customers } = this.props;

    return (
      <GridTemplate>
        {customers.map(({userId, username, email, name, surname}) => (
          <UserCard
            userId={userId}
            username={username}
            email={email}
            name={name}
            surname={surname}
            key={userId}
          />
        ))}
      </GridTemplate>
    );
  }
}

Customers.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
       email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
         surname: PropTypes.string.isRequired,
    }),
  ),
};

Customers.defaultProps = {
  customers: [],
};

const mapStateToProps = state => {
  const { customers } = state;
  return { customers };
};

const mapDispatchToProps = dispatch => ({
  GetCustomers: () => dispatch(fetchCustomers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customers);