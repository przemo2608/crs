import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from '../templates/GridTemplate';
import UserCard from '../components/molecules/Card/UserCard';
import { fetchWorkers } from '../actions/index';

class Workers extends Component {
  componentDidMount() {
    const { GetWorkers } = this.props;
    GetWorkers();
  }


  render() {
    const { workers } = this.props;

    return (
      <GridTemplate>
        {workers.map(({id, username, email, name, surname}) => (
          <UserCard
            id={id}
            username={username}
            email={email}
            name={name}
            surname={surname}
            key={id}
          />
        ))}
      </GridTemplate>
    );
  }
}

Workers.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
       email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
         surname: PropTypes.string.isRequired,
    }),
  ),
};

Workers.defaultProps = {
  workers: [],
};

const mapStateToProps = state => {
  const { workers } = state;
  return { workers };
};

const mapDispatchToProps = dispatch => ({
  GetWorkers: () => dispatch(fetchWorkers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workers);