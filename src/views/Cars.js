import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from '../templates/GridTemplate';
import CarCard from '../components/molecules/Card/CarCard';
import { fetchCars } from '../actions/index';

class Cars extends Component {
  componentDidMount() {
    const { GetCars } = this.props;
    GetCars(localStorage.getItem('user'));
  }


  render() {
    const { cars, user } = this.props;

    return (
      <GridTemplate>
        {cars.map(({id, carBrand, model, registrationNumber}) => (
          <CarCard
            id={id}
            carBrand={carBrand}
            model={model}
            registrationNumber={registrationNumber}
            key={id}
          />
        ))}
      </GridTemplate>
    );
  }
}

Cars.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      carBrand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      registrationNumber: PropTypes.string.isRequired,
    }),
  ),
};

Cars.defaultProps = {
  cars: [],
};

const mapStateToProps = state => {
  const { cars, user } = state;
  return { cars, user };
};

const mapDispatchToProps = dispatch => ({
  GetCars: (userId) => dispatch(fetchCars(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cars);