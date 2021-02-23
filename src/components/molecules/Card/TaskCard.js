import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Heading from '../../atoms/Heading/Heading';
import Button from '../../atoms/Button/Button';
import withContext from '../../../hoc/withContext';
import { connect } from 'react-redux';
import { changeTaskStatus as changeTaskStatusAction } from '../../../actions/index';

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





class TaskCard extends Component {


  

  render() {
    const { id, pageContext, title, description, status, carBrand, carModel, user, changeTaskStatus} = this.props;
    

    

    return (
      <StyledWrapper>
        <InnerWrapper  activeColor={pageContext}>
          <StyledHeading>{title}</StyledHeading>
        </InnerWrapper>
        <InnerWrapper flex>
          <Paragraph>Opis: {description}</Paragraph>
           <Paragraph>Status zlecenia: {status}</Paragraph>
            <Paragraph>Samochód: {carBrand} {carModel}</Paragraph>
              {user.role === 'Mechanic' && <Button onClick={() => changeTaskStatus(id)} secondary>ZAKOŃCZ</Button>}
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

TaskCard.propTypes = {
  id: PropTypes.number.isRequired,
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']),
 
};

TaskCard.defaultProps = {
  pageContext: 'tasks',
};

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};


const mapDispatchToProps = dispatch => ({
  changeTaskStatus: (id) => dispatch(changeTaskStatusAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(TaskCard));