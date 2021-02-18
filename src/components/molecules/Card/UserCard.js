import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Heading from '../../atoms/Heading/Heading';
import Button from '../../atoms/Button/Button';
import withContext from '../../../hoc/withContext';
import { connect } from 'react-redux';
import { removeUser as removeUserAction } from '../../../actions/index';

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
      justify-content: space-between;
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





class UserCard extends Component {
  state = {
    redirect: false,
  };

  handleCardClick = () => this.setState({ redirect: true });

  render() {
    const { id, pageContext, username, email, name, surname, removeUser, user} = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`${pageContext}/${id}`} />;
    }

    return (
      <StyledWrapper>
        <InnerWrapper  activeColor={pageContext}>
          <StyledHeading>{username}</StyledHeading>
        </InnerWrapper>
        <InnerWrapper flex>
          <Paragraph>E-mail: {email}</Paragraph>
          <Paragraph>Imię: {name}</Paragraph>
          <Paragraph>Nazwisko: {surname}</Paragraph>
          <Button onClick={this.handleCardClick} secondary>
            SZCZEGÓŁY
          </Button>
          {user.role === 'Admin' && <Button onClick={() => removeUser(id)} secondary>USUŃ</Button>}
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']),
  
};

UserCard.defaultProps = {
  pageContext: 'news',
};

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = dispatch => ({
  removeUser: (id) => dispatch(removeUserAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(UserCard));