import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Navbar from '../components/organisms/Navbar/Navbar';

const StyledWrapper = styled.div`
  padding-left: 150px;
`;

const AfterLoginTemplate = ({ children }) => (
  <StyledWrapper>
    <Navbar />
    {children}
  </StyledWrapper>
);

AfterLoginTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default AfterLoginTemplate;