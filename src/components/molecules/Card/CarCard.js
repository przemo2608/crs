import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Heading from '../../atoms/Heading/Heading';
import Button from '../../atoms/Button/Button';
import withContext from '../../../hoc/withContext';
import { connect } from 'react-redux';
import { removeCar as removeCarAction } from '../../../actions/index';

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 17px 30px;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : 'white')};
  :first-of-type {
    z-index: 9999;
  }
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
     
    `}
`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;





class CarCard extends Component {
  state = {
    redirect: false,
  };

  handleCardClick = () => this.setState({ redirect: true });

  render() {
    const { id, pageContext, carBrand, model, registrationNumber, removeCar, user} = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`${pageContext}/${id}`} />;
    }

    return (
      <StyledWrapper>
        <InnerWrapper  activeColor={pageContext}>
          <StyledHeading>{carBrand}</StyledHeading>
        </InnerWrapper>
        <InnerWrapper flex>
          <Paragraph>Model:  {model}</Paragraph>
           <Paragraph>Numer rejestracyjny: {registrationNumber}</Paragraph>
        
          {user.role === 'Customer' && <Button onClick={() => removeCar(id)} secondary>USUŃ</Button>}
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

CarCard.propTypes = {
  id: PropTypes.number.isRequired,
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']),
 
};

CarCard.defaultProps = {
  pageContext: 'news',
};

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = dispatch => ({
  removeCar: (id) => dispatch(removeCarAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(CarCard));