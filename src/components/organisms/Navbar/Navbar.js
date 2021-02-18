import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Buttonicon from '../../atoms/Buttonicon/Buttonicon';
import newsIcon from '../../../assets/news.svg';
import carsIcon from '../../../assets/car.svg';
import customersIcon from '../../../assets/user.svg';
import logoutIcon from '../../../assets/logout.svg';
import tasksIcon from '../../../assets/tasks.svg';
import workersIcon from '../../../assets/workers.svg';
import logoIcon from '../../../assets/engine.svg';
import withContext from '../../../hoc/withContext'

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  background-color:  ${({color, theme}) => (color ? theme[color] : theme.news)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoutButton = styled(Buttonicon)`
  margin-top: auto;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 100px;
  height: 100px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;
`;


const Navbar = ({pageContext}) =>(
    <Wrapper color={pageContext}>
        <StyledLogoLink to="/" />
       <StyledLinksList>
           <li>
           <Buttonicon as={NavLink} to="/news" icon={newsIcon} activeclass="active"/>
           </li>
           <li>
           <Buttonicon as={NavLink} to="/cars" icon={carsIcon} activeclass="active"/>
           </li>
           <li>
           <Buttonicon as={NavLink} to="/tasks" icon={tasksIcon} activeclass="active"/>
           </li>
           <li>
           <Buttonicon as={NavLink} to="/workers" icon={workersIcon} activeclass="active"/>
           </li>
           <li>
           <Buttonicon as={NavLink} to="/customers" icon={customersIcon} activeclass="active"/>
           </li>
       </StyledLinksList>
       <StyledLogoutButton as={NavLink} to="/logout" icon={logoutIcon} />
    </Wrapper>
);

Navbar.propTypes = {
  pageContext: PropTypes.oneOf(['news', 'workers', 'cars', 'tasks', 'customers']),
};

Navbar.defaultProps = {
  pageContext: 'news',
};

export default withContext(Navbar);