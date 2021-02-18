import React from 'react';
import styled from 'styled-components';
import logoImg from '../assets/engine.svg'
import backgroundImg from '../assets/background.jpg'
import Heading from '../components/atoms/Heading/Heading';



const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.news};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 70px;
`;

const StyledAuthCard = styled.div`
  width: 400px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthTemplate = ({ children }) => (
  <StyledWrapper>
    <StyledLogo src={logoImg} alt="" />
    <StyledAuthCard>{children}</StyledAuthCard>
  </StyledWrapper>
);

export default AuthTemplate;